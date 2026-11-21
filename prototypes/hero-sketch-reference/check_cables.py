# Output check: every cable must stay inside the glass, except where it is meant to leave:
# above the right riser's mouth (sockets), inside the box, or through a declared hole.
import re,math,sys
def pts(d,step=2):
    toks=re.findall(r'[MVHQC]|-?\d+\.?\d*',d); i=0; x=y=0; out=[]; cmd=None
    def num():
        nonlocal i; v=float(toks[i]); i+=1; return v
    while i<len(toks):
        if toks[i] in 'MVHQC': cmd=toks[i]; i+=1
        if cmd=='M': x,y=num(),num(); out.append((x,y))
        elif cmd in 'VH':
            nx,ny=(x,num()) if cmd=='V' else (num(),y)
            n=max(1,int(math.hypot(nx-x,ny-y)/step))
            out+=[(x+(nx-x)*k/n,y+(ny-y)*k/n) for k in range(1,n+1)]; x,y=nx,ny
        elif cmd=='Q':
            cx,cy,nx,ny=num(),num(),num(),num()
            for k in range(1,41):
                t=k/40; out.append(((1-t)**2*x+2*(1-t)*t*cx+t*t*nx,(1-t)**2*y+2*(1-t)*t*cy+t*t*ny))
            x,y=nx,ny
        elif cmd=='C':
            a,b,c,dd,nx,ny=[num() for _ in range(6)]
            for k in range(1,61):
                t=k/60; u=1-t
                out.append((u**3*x+3*u*u*t*a+3*u*t*t*c+t**3*nx,u**3*y+3*u*u*t*b+3*u*t*t*dd+t**3*ny))
            x,y=nx,ny
    return out
def inside(p,centers,half):
    return min(math.hypot(p[0]-q[0],p[1]-q[1]) for q in centers)<=half
def check(ns,allowed,label):
    cl=pts(ns['LEFT'],1)+pts(ns['RIGHT'],1); half=ns['PW']/2-3
    bad=[]
    for path in ns['CABLES']+[ns['SIDE']]:
        for p in pts(path):
            if p[1]<600 or inside(p,cl,half) or any(x0<=p[0]<=x1 and y0<=p[1]<=y1 for x0,y0,x1,y1 in allowed): continue
            bad.append(p)
    print(f"{label}: {'CABLES_INSIDE_OK' if not bad else f'OUTSIDE {len(bad)} points, e.g. ({bad[0][0]:.0f},{bad[0][1]:.0f})'}")
    return not bad
if __name__=='__main__':
    src=open('build.py').read(); src=src[:src.index('open("structure.svg"')]
    ns={}; exec(src,ns)
    # version 3: box rect is the only allowed zone
    sys.exit(0 if check(ns,[(404,1084,576,1180)],'version 3') else 1)
