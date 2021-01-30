use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{WebGlProgram, WebGlRenderingContext, WebGlShader};

pub struct Position {
    x: f32,
    y: f32,
}

#[wasm_bindgen]
pub fn chasm() -> Result<(), JsValue> {
    let window = web_sys::window().unwrap();
    let document = window.document().unwrap();
    let chasm = document.get_element_by_id("chasm").unwrap();
    let canvas: web_sys::HtmlCanvasElement = chasm.dyn_into::<web_sys::HtmlCanvasElement>()?;

    // get window width & height
    // https://github.com/rustwasm/wasm-bindgen/issues/2231
    let win_width = window.inner_width()?.as_f64().ok_or(JsValue::NULL)?;
    let win_height = window.inner_height()?.as_f64().ok_or(JsValue::NULL)?;

    // get canvas width & height
    // let canvas_width: JsValue = canvas.width().into();
    // let canvas_height: JsValue = canvas.height().into();
    // console::log_2(&"canvas_width => ".into(), &canvas_width);
    // console::log_2(&"canvas_height => ".into(), &canvas_height);

    // fit the canvas to the viewport
    canvas.set_width(win_width as u32);
    canvas.set_height(win_height as u32);

    let gl = canvas
        .get_context("webgl")?
        .unwrap()
        .dyn_into::<WebGlRenderingContext>()?;

    gl.viewport(0, 0, canvas.width() as i32, canvas.height() as i32);

    let vert_shader = compile_shader(
        &gl,
        WebGlRenderingContext::VERTEX_SHADER,
        r#"
// vertex position attribure
attribute vec2 a_Position;
// set vertex position
void main() {
  gl_Position = vec4(a_Position, 0, 1);
}
"#,
    )?;
    let frag_shader = compile_shader(
        &gl,
        WebGlRenderingContext::FRAGMENT_SHADER,
        r#"
// choose flot precision
precision mediump float;
// uniform values
uniform vec2 u_viewport;
uniform vec2 u_juliaComplex;
// function to map from a range to another (I know there's an extra pair of parenthesis but it makes the operation easier to understand)
float map (float v, float inMin, float inMax, float outMin, float outMax) {
  return ((v - inMin) * ((outMax - outMin) / (inMax - inMin))) + outMin;
}
// set the opacity of every pixel by checking if any of its position's components, mapped to the complex plane, tend to infinity or not after applying recursively to them the function f(z) = z^2 + c (c being the mouse's position's x and y coordinates, relative to the viewport, mapped to -1.4 -> 1.4 range and -2 -> 2 respectively; this additional mapping is not necessary but I simply used it for aesthetic purposes)
void main() {
  // check if any of the components of the current complex number tend to infinity (and if so after how many iterations)
  float real = map(gl_FragCoord.x, 0.0, u_viewport.x, -2.0, 2.0);
      float imaginary = map(gl_FragCoord.y, 0.0, u_viewport.y, 1.4, -1.4);
      float realSquared = real * real;
      float imaginarySquared = imaginary * imaginary;
      int iterationCount;
      for(int i = 0; i < 255; i++){
          imaginary = 2.0 * real * imaginary + map(u_juliaComplex.y, 0.0, u_viewport.y, .8, -.8);
          real = realSquared - imaginarySquared + map(u_juliaComplex.x, 0.0, u_viewport.x, -.9, .4);
          realSquared = real * real;
          imaginarySquared = imaginary * imaginary;
          iterationCount = i;
          if( abs((imaginarySquared) / (imaginary + real)) > 10.0 ){ break; }
      }
      // set pixels color
      if (iterationCount == 254){
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, map(float(iterationCount), 0.0, 253.0, 0.0, 1.0) + .75);
  }
}
"#,
    )?;

    let program = link_program(&gl, &vert_shader, &frag_shader)?;
    gl.use_program(Some(&program));

    // get the locations of attributes (and activate their address in the vertex attributes array) and uniforms
    // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getAttribLocation
    let vertex_position_location = gl.get_attrib_location(&program, "a_Position") as u32;
    gl.enable_vertex_attrib_array(vertex_position_location as u32);

    let viewport_uniform_location = gl.get_uniform_location(&program, "u_viewport");
    let julia_complex_uniform_location = gl.get_uniform_location(&program, "u_juliaComplex");

    let buffer = gl.create_buffer().ok_or("failed to create buffer")?;
    gl.bind_buffer(WebGlRenderingContext::ARRAY_BUFFER, Some(&buffer));

    // create the buffer that the GPU will get the vertex data from
    let vertices: [f32; 8] = [-1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0];

    // Note that `Float32Array::view` is somewhat dangerous (hence the
    // `unsafe`!). This is creating a raw view into our module's
    // `WebAssembly.Memory` buffer, but if we allocate more pages for ourself
    // (aka do a memory allocation in Rust) it'll cause the buffer to change,
    // causing the `Float32Array` to be invalid.
    //
    // As a result, after `Float32Array::view` we have to be very careful not to
    // do any memory allocations before it's dropped.
    unsafe {
        let vert_array = js_sys::Float32Array::view(&vertices);

        gl.buffer_data_with_array_buffer_view(
            WebGlRenderingContext::ARRAY_BUFFER,
            &vert_array,
            WebGlRenderingContext::STATIC_DRAW,
        );
    }

    // actual and lerped mouse coordinates
    let mouse_point: Position = Position {
        x: (canvas.width() / 2) as f32,
        y: (canvas.height() / 2) as f32,
    };
    let mut mouse_lerp_point: Position = Position {
        x: (canvas.width() / 2) as f32,
        y: (canvas.height() / 2) as f32,
    };
    let lerping_factor = 0.07;

    let mut draw_loop = || {
        // add lerp effect to make the transition between complex numbers smooth
        mouse_lerp_point.x += (mouse_point.x - mouse_lerp_point.x) * lerping_factor;
        mouse_lerp_point.y += (mouse_point.y - mouse_lerp_point.y) * lerping_factor;

        if let Some(val) = &julia_complex_uniform_location {
            gl.uniform2f(Some(val), mouse_lerp_point.x, mouse_lerp_point.y);
        }

        // tell webgl where to look for vertex data inside the vertex buffer
        gl.vertex_attrib_pointer_with_i32(
            vertex_position_location,
            2,
            WebGlRenderingContext::FLOAT,
            false,
            0,
            0,
        );
        // draw two triangle strips (will form a rectangle)
        gl.draw_arrays(WebGlRenderingContext::TRIANGLE_STRIP, 0, 4);
    };

    if let Some(val) = &viewport_uniform_location {
        gl.uniform2f(Some(val), win_width as f32, win_height as f32);
    }

    draw_loop();

    // window.request_animation_frame();

    Ok(())
}

pub fn compile_shader(
    context: &WebGlRenderingContext,
    shader_type: u32,
    source: &str,
) -> Result<WebGlShader, String> {
    let shader = context
        .create_shader(shader_type)
        .ok_or_else(|| String::from("Unable to create shader object"))?;
    context.shader_source(&shader, source);
    context.compile_shader(&shader);

    if context
        .get_shader_parameter(&shader, WebGlRenderingContext::COMPILE_STATUS)
        .as_bool()
        .unwrap_or(false)
    {
        Ok(shader)
    } else {
        Err(context
            .get_shader_info_log(&shader)
            .unwrap_or_else(|| String::from("Unknown error creating shader")))
    }
}

pub fn link_program(
    context: &WebGlRenderingContext,
    vert_shader: &WebGlShader,
    frag_shader: &WebGlShader,
) -> Result<WebGlProgram, String> {
    let program = context
        .create_program()
        .ok_or_else(|| String::from("Unable to create shader object"))?;

    context.attach_shader(&program, vert_shader);
    context.attach_shader(&program, frag_shader);
    context.link_program(&program);

    if context
        .get_program_parameter(&program, WebGlRenderingContext::LINK_STATUS)
        .as_bool()
        .unwrap_or(false)
    {
        Ok(program)
    } else {
        Err(context
            .get_program_info_log(&program)
            .unwrap_or_else(|| String::from("Unknown error creating program object")))
    }
}
