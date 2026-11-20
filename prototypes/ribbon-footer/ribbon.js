// Independent ribbon field and ordered dithering study, written from visual references.
// No React Bits Pro source is used.
export function mountDither(container, options = {}) {
  const settings = {...options};
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden','true');
  container.append(canvas);
  const gl=canvas.getContext('webgl2',{alpha:false,antialias:false,depth:false});
  if(!gl) { container.textContent='WebGL 2 is required for this preview.'; return Object.assign(()=>canvas.remove(),{update(){}}); }
  const vertex=`#version 300 es
  in vec2 aPosition;
  void main(){gl_Position=vec4(aPosition,0.,1.);}`;
  const fragment=`#version 300 es
  precision highp float;
  uniform vec2 uResolution;
  uniform float uTime,uScale,uSpeed,uIntensity,uCell,uLevels,uContrast,uBrightness,uWhite,uBlack,uGamma,uExposure,uFrequency,uRidge,uBend,uZoom,uCropX,uCropY,uCoreSize,uCoreStrength;
  uniform vec3 uPrimary,uSecondary,uBackground;
  uniform float uColorBlend;
  uniform int uShape;
  out vec4 outColor;
  mat2 turn(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
  float bayer(vec2 p) {
    ivec2 v=ivec2(mod(p,8.));
    int x=v.x,y=v.y;
    int a=((x&1)^ (y&1))*2+(y&1);
    int b=(((x>>1)&1)^((y>>1)&1))*2+((y>>1)&1);
    int c=(((x>>2)&1)^((y>>2)&1))*2+((y>>2)&1);
    return (float(a*16+b*4+c)+.5)/64.;
  }
  vec2 referenceWarp(vec2 q,float t) {
    for(int i=0;i<7;i++) {
      float n=float(i)+1.;
      float phase=t*(.23+float(i)*.035);
      q+=(.8+.7*uIntensity)/(1.+n*.12)*vec2(
        sin(q.y*uFrequency+phase+n*.8),
        cos(q.x*uFrequency-phase+n*1.17));
      q=turn(uBend+.16)*q;
    }
    return q;
  }
  void main(){
    vec2 cell=floor(gl_FragCoord.xy/uCell);
    // Treat the footer as a crop of a wider reference field. Its shallow
    // container must not squeeze an entire scene into the band height.
    float framingHeight=max(uResolution.y,uResolution.x*.5);
    vec2 uv=((cell+.5)*uCell-.5*uResolution)/framingHeight;
    float t=uTime*uSpeed*1.4;
    vec2 world=uv/max(.01,uZoom)+vec2(uCropX,uCropY);
    vec2 p=turn(-.35)*world*uScale;
    vec2 q=p;
    if(uShape==2) {
      // One global branching field, with a stationary origin and denser detail
      // farther out. The center is intrinsic to this mapping, not an overlay.
      float curvature=.05/max(.08,uCoreSize)*uCoreStrength;
      q=vec2(p.x*p.x-p.y*p.y,2.*p.x*p.y)*curvature+p*.18;
      q=referenceWarp(q,t)-referenceWarp(vec2(0.),t);
    } else if(uShape==0) {
      for(int i=0;i<6;i++) {
        float n=float(i)+1.;
        float phase=t*(.5+float(i)*.09);
        q+=uIntensity/(n*.72+1.)*vec2(
          sin(q.y*uFrequency+phase+n*1.37),
          sin(q.x*uFrequency-phase+n*1.91));
        q=turn(uBend)*q;
      }
    } else {
    q=p;
    q+=.55*vec2(sin(p.y*.65+t),cos(p.x*.53-t*.7));
    float pitch=4.4/max(.4,uFrequency);
    vec2 grid=floor(p/pitch);
    // Smooth local rotations pull continuous ribbons into eddies.
    // The radial falloff keeps each curl connected to the surrounding field.
    for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++) {
      vec2 id=grid+vec2(float(i),float(j));
      vec2 random=fract(sin(vec2(dot(id,vec2(127.1,311.7)),dot(id,vec2(269.5,183.3))))*43758.5453);
      vec2 center=(id+.5+(random-.5)*.55)*pitch;
      center+=pitch*.12*vec2(sin(t*.45+random.x*6.28),cos(t*.39+random.y*6.28));
      vec2 delta=p-center;
      float radius=pitch*(.38+.16*random.x);
      float falloff=exp(-dot(delta,delta)/(radius*radius));
      float signTurn=random.y>.5?1.:-1.;
      float angle=signTurn*uIntensity*2.6*falloff*(.85+.25*sin(t*.55+random.x*6.28));
      q+=turn(angle)*delta-delta;
    }
    q=turn(uBend)*q;
    }
    float phase=q.x*.9+q.y*.42+t*.22+(uShape==2?1.5707963:0.);
    float ribbon=.5+.5*sin(phase);
    float f;
    if(uShape==2) {
      float broad=pow(max(0.,sin(phase)),max(.3,uRidge*1.8));
      float fine=pow(max(0.,sin(phase-1.05)),44.);
      f=clamp(broad+fine*.75,0.,1.);
    } else {
      f=pow(ribbon,uRidge*(uShape==0?1.:1.8));
    }
    f=(f-.5)*uContrast+.5+uBrightness;
    f=clamp((f-uBlack)/max(.001,uWhite-uBlack),0.,1.);
    f=clamp(pow(f,1./max(.05,uGamma))*exp2(uExposure),0.,1.);
    float threshold=bayer(cell);
    float levels=max(1.,uLevels-1.);
    float shade=clamp(floor(f*levels+threshold)/levels,0.,1.);
    vec3 neutral=mix(uBackground,uPrimary,shade);
    vec3 colored=shade<.5?mix(uBackground,uSecondary,shade*2.):mix(uSecondary,uPrimary,(shade-.5)*2.);
    vec3 color=mix(neutral,colored,uColorBlend);
    outColor=vec4(color,1.);
  }`;
  function compile(type,source) {
    const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  }
  const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment);
  const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.bindAttribLocation(program,0,'aPosition');gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));
  gl.deleteShader(vs);gl.deleteShader(fs);
  const vao=gl.createVertexArray();gl.bindVertexArray(vao);
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
  const locations=new Map();const uniform=n=>{if(!locations.has(n))locations.set(n,gl.getUniformLocation(program,n));return locations.get(n);};
  function color(hex){const v=String(hex).replace('#','');return [0,2,4].map(i=>parseInt(v.slice(i,i+2),16)/255);}
  let time=0,last=0,raf=0,visible=true,destroyed=false,frames=0;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function draw(){
    gl.useProgram(program);gl.bindVertexArray(vao);gl.viewport(0,0,canvas.width,canvas.height);
    gl.uniform2f(uniform('uResolution'),canvas.width,canvas.height);
    gl.uniform1i(uniform('uShape'),settings.shape==='reference'?2:settings.shape==='spiral'?1:0);
    const ratio=canvas.width/Math.max(1,container.clientWidth);
    const values={uTime:time,uCropX:settings.cropX??0,uCropY:settings.cropY??0,uCoreSize:settings.coreSize??.4,uCoreStrength:settings.coreStrength??1,uZoom:settings.zoom??1,uScale:settings.scale??4,uSpeed:settings.waveSpeed??1,uIntensity:settings.waveAmplitude??2,uCell:(settings.pixelSize??2)*ratio,uLevels:settings.colorNum??3,uContrast:settings.contrast??1,uBrightness:settings.brightness??0,uWhite:settings.whitePoint??1,uBlack:settings.blackPoint??0,uGamma:settings.gamma??1,uExposure:settings.exposure??0,uFrequency:settings.waveFrequency??1,uRidge:settings.ridge??1.8,uBend:settings.bend??.22,uColorBlend:settings.colorBlend??0};
    for(const [key,value] of Object.entries(values))gl.uniform1f(uniform(key),value);
    gl.uniform3fv(uniform('uPrimary'),color(settings.waveColor??'#e6e5e9'));
    gl.uniform3fv(uniform('uSecondary'),color(settings.secondaryColor??'#5227ff'));
    gl.uniform3fv(uniform('uBackground'),color(settings.backgroundColor??'#0b0b0b'));
    gl.drawArrays(gl.TRIANGLES,0,3);
    canvas.dataset.frame=String(++frames);
    canvas.dataset.time=time.toFixed(3);
  }
  function frame(now){raf=0;if(!visible||document.hidden||destroyed){last=0;return;}if(last&&!settings.disableAnimation&&!reduce)time+=Math.min(.05,(now-last)/1000);last=now;draw();if(!settings.disableAnimation&&!reduce)raf=requestAnimationFrame(frame);}
  function wake(){if(!raf&&!destroyed)raf=requestAnimationFrame(frame);}
  function resize(){const ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.max(1,Math.round(container.clientWidth*ratio));canvas.height=Math.max(1,Math.round(container.clientHeight*ratio));draw();wake();}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);
  const intersection=new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);last=0;if(visible)wake();});intersection.observe(container);
  const visibility=()=>{last=0;if(!document.hidden)wake();};document.addEventListener('visibilitychange',visibility);
  resize();
  const destroy=()=>{destroyed=true;cancelAnimationFrame(raf);resizeObserver.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',visibility);gl.deleteBuffer(buffer);gl.deleteVertexArray(vao);gl.deleteProgram(program);canvas.remove();};
  destroy.update=patch=>{Object.assign(settings,patch);draw();wake();};
  return destroy;
}
