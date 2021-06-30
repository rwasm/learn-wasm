// vertex position attribure
attribute vec2 a_Position;

// set vertex position
void main() {
  gl_Position = vec4(a_Position, 0, 1);
}