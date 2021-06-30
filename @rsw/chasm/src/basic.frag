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