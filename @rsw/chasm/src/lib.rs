use std::cell::RefCell;
use std::rc::Rc;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::WebGlRenderingContext as GL;

#[wasm_bindgen]
pub fn chasm() -> Result<(), JsValue> {
    let window = window();
    let document = document();
    let chasm = document.get_element_by_id("chasm").unwrap();
    let canvas: web_sys::HtmlCanvasElement = chasm.dyn_into::<web_sys::HtmlCanvasElement>()?;

    // get window width & height
    // https://github.com/rustwasm/wasm-bindgen/issues/2231
    let win_width = window.inner_width()?.as_f64().ok_or(JsValue::NULL)?;
    let win_height = window.inner_height()?.as_f64().ok_or(JsValue::NULL)?;

    // fit the canvas to the viewport
    canvas.set_width(win_width as u32);
    canvas.set_height(win_height as u32);

    let gl = canvas.get_context("webgl")?.unwrap().dyn_into::<GL>()?;
    let gl = Rc::new(gl);

    gl.viewport(0, 0, canvas.width() as i32, canvas.height() as i32);

    let (vert_code, frag_code) = shader_code();

    // create vert_shader
    let vert_shader = gl.create_shader(GL::VERTEX_SHADER).unwrap();
    gl.shader_source(&vert_shader, &vert_code);
    gl.compile_shader(&vert_shader);

    // create frag_shader
    let frag_shader = gl.create_shader(GL::FRAGMENT_SHADER).unwrap();
    gl.shader_source(&frag_shader, &frag_code);
    gl.compile_shader(&frag_shader);

    // create shader program
    let program = gl.create_program().unwrap();
    gl.attach_shader(&program, &vert_shader);
    gl.attach_shader(&program, &frag_shader);
    gl.link_program(&program);

    gl.use_program(Some(&program));

    // get the locations of attributes (and activate their address in the vertex attributes array) and uniforms
    // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getAttribLocation
    let vertex_position_location = gl.get_attrib_location(&program, "a_Position") as u32;
    let julia_complex_uniform_location = gl.get_uniform_location(&program, "u_juliaComplex");
    gl.enable_vertex_attrib_array(vertex_position_location as u32);

    let viewport_uniform_location = gl.get_uniform_location(&program, "u_viewport");

    let buffer = gl.create_buffer().unwrap();
    gl.bind_buffer(GL::ARRAY_BUFFER, Some(&buffer));

    // create the buffer that the GPU will get the vertex data from
    let vertices: Vec<f32> = vec![-1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0];
    let vert_array = js_sys::Float32Array::from(vertices.as_slice());

    gl.buffer_data_with_array_buffer_view(GL::ARRAY_BUFFER, &vert_array, GL::STATIC_DRAW);

    if let Some(val) = &viewport_uniform_location {
        gl.uniform2f(Some(val), win_width as f32, win_height as f32);
    }

    let original_mouse_point_x = Rc::new(RefCell::new((canvas.width() / 2) as f32));
    let original_mouse_point_y = Rc::new(RefCell::new((canvas.height() / 2) as f32));

    let lerping_factor = 1.0;

    {
        // request_animation_frame
        let p1_x = original_mouse_point_x.clone();
        let p1_y = original_mouse_point_y.clone();

        let f = Rc::new(RefCell::new(None));
        let g = f.clone();
        *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
            if let Some(val) = &julia_complex_uniform_location {
                gl.uniform2f(
                    Some(val),
                    *p1_x.borrow() * lerping_factor,
                    *p1_y.borrow() * lerping_factor,
                );
            }

            // tell webgl where to look for vertex data inside the vertex buffer
            gl.vertex_attrib_pointer_with_i32(vertex_position_location, 2, GL::FLOAT, false, 0, 0);
            // draw two triangle strips (will form a rectangle)
            gl.draw_arrays(GL::TRIANGLE_STRIP, 0, 4);

            // Schedule ourself for another requestAnimationFrame callback.
            request_animation_frame(f.borrow().as_ref().unwrap());
        }) as Box<dyn FnMut()>));

        request_animation_frame(g.borrow().as_ref().unwrap());
    }

    {
        // mousemove
        let p1_x = original_mouse_point_x.clone();
        let p1_y = original_mouse_point_y.clone();

        let mousemove_cb = Closure::wrap(Box::new(move |event: web_sys::MouseEvent| {
            *p1_x.borrow_mut() = event.client_x() as f32;
            *p1_y.borrow_mut() = event.client_y() as f32;
        }) as Box<dyn FnMut(_)>);

        canvas
            .add_event_listener_with_callback("mousemove", mousemove_cb.as_ref().unchecked_ref())?;

        mousemove_cb.forget();
    }

    Ok(())
}

fn window() -> web_sys::Window {
    web_sys::window().expect("no global `window` exists")
}

fn document() -> web_sys::Document {
    window()
        .document()
        .expect("should have a document on window")
}

fn request_animation_frame(f: &Closure<dyn FnMut()>) {
    window()
        .request_animation_frame(f.as_ref().unchecked_ref())
        .expect("should register `requestAnimationFrame` OK");
}

fn shader_code() -> (&'static str, &'static str) {
    let vert_code = r#"
// vertex position attribure
attribute vec2 a_Position;
// set vertex position
void main() {
  gl_Position = vec4(a_Position, 0, 1);
}
"#;
    let frag_code = r#"
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
"#;
    (vert_code, frag_code)
}
