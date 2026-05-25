import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, QrCode, Zap, ArrowRight } from "lucide-react";

export function Aurora() {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(160deg, #080818 0%, #0d0a2e 45%, #0a1628 75%, #080818 100%)",
      fontFamily: "'Inter', system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Aurora blobs */}
      <motion.div animate={{ scale: [1,1.18,1], opacity: [0.4,0.65,0.4] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{ position:"absolute", top:"-20%", left:"-10%", width:"65%", height:"65%", borderRadius:"50%",
          background:"radial-gradient(ellipse, rgba(110,50,255,0.4) 0%, transparent 70%)", filter:"blur(70px)", pointerEvents:"none" }} />
      <motion.div animate={{ scale: [1,1.25,1], opacity: [0.3,0.5,0.3] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay:2 }}
        style={{ position:"absolute", top:"15%", right:"-15%", width:"60%", height:"60%", borderRadius:"50%",
          background:"radial-gradient(ellipse, rgba(0,160,255,0.35) 0%, transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />
      <motion.div animate={{ scale: [1,1.12,1], opacity: [0.25,0.45,0.25] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay:4 }}
        style={{ position:"absolute", bottom:"-15%", left:"15%", width:"65%", height:"55%", borderRadius:"50%",
          background:"radial-gradient(ellipse, rgba(220,60,150,0.28) 0%, transparent 70%)", filter:"blur(80px)", pointerEvents:"none" }} />
      {/* Horizontal aurora streak */}
      <motion.div animate={{ y:[0,-25,0], opacity:[0.12,0.28,0.12] }} transition={{ duration: 14, repeat: Infinity, ease:"easeInOut" }}
        style={{ position:"absolute", top:"18%", left:"5%", width:"90%", height:"2px",
          background:"linear-gradient(90deg, transparent, rgba(110,60,255,0.8), rgba(0,170,255,0.8), rgba(220,60,150,0.5), transparent)",
          filter:"blur(1.5px)", borderRadius:"2px", pointerEvents:"none" }} />
      {/* Stars */}
      {[...Array(28)].map((_, i) => (
        <motion.div key={i} animate={{ opacity:[0.15,0.9,0.15] }}
          transition={{ duration: 2+Math.random()*4, repeat:Infinity, delay:Math.random()*6 }}
          style={{ position:"absolute", top:`${5+Math.random()*90}%`, left:`${Math.random()*100}%`,
            width: Math.random()>0.7?"2px":"1px", height: Math.random()>0.7?"2px":"1px",
            borderRadius:"50%", background:"white", pointerEvents:"none" }} />
      ))}

      <motion.div initial={{ opacity:0, y:32, scale:0.96 }} animate={{ opacity:1, y:0, scale:1 }}
        transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
        style={{ width:"100%", maxWidth:"380px", padding:"0 20px", position:"relative", zIndex:10 }}>

        {/* Logo */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"36px" }}>
          <motion.div initial={{ scale:0.5, rotate:-20, opacity:0 }} animate={{ scale:1, rotate:0, opacity:1 }}
            transition={{ type:"spring", stiffness:170, damping:16, delay:0.1 }}
            style={{ width:"82px", height:"82px", borderRadius:"26px",
              background:"linear-gradient(135deg, rgba(110,50,255,0.18) 0%, rgba(0,170,255,0.12) 100%)",
              border:"1.5px solid rgba(255,255,255,0.1)",
              display:"flex", alignItems:"center", justifyContent:"center",
              marginBottom:"20px",
              boxShadow:"0 0 50px rgba(110,50,255,0.35), 0 0 100px rgba(0,160,255,0.18), inset 0 1px 0 rgba(255,255,255,0.12)",
              backdropFilter:"blur(16px)" }}>
            <Zap size={38} style={{ color:"white", filter:"drop-shadow(0 0 14px rgba(130,80,255,0.9))" }} />
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
            style={{ fontSize:"40px", fontWeight:900, letterSpacing:"-1.5px", marginBottom:"6px",
              background:"linear-gradient(135deg, #ffffff 0%, #b478ff 45%, #00ccff 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Pulse
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
            style={{ color:"rgba(255,255,255,0.4)", fontSize:"14px", fontWeight:500, letterSpacing:"0.01em" }}>
            С возвращением ✦
          </motion.p>
        </div>

        {/* Card */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.28, duration:0.6 }}
          style={{ background:"rgba(255,255,255,0.038)", backdropFilter:"blur(36px)", WebkitBackdropFilter:"blur(36px)",
            border:"1px solid rgba(255,255,255,0.075)", borderRadius:"28px", padding:"28px 24px",
            boxShadow:"0 30px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)" }}>

          {/* Username field */}
          <div style={{ marginBottom:"16px" }}>
            <label style={{ display:"block", fontSize:"10px", fontWeight:800, letterSpacing:"0.13em",
              textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:"8px", paddingLeft:"4px" }}>
              Имя или никнейм
            </label>
            <div style={{ background: focused==="u" ? "rgba(110,50,255,0.09)" : "rgba(255,255,255,0.04)",
              border:`1px solid ${focused==="u" ? "rgba(110,60,255,0.65)" : "rgba(255,255,255,0.07)"}`,
              borderRadius:"16px", transition:"all 0.2s",
              boxShadow: focused==="u" ? "0 0 0 3px rgba(110,60,255,0.15), 0 0 24px rgba(110,60,255,0.12)" : "none" }}>
              <input type="text" placeholder="@никнейм или имя" onFocus={()=>setFocused("u")} onBlur={()=>setFocused(null)}
                style={{ width:"100%", background:"transparent", border:"none", outline:"none",
                  padding:"14px 16px", color:"rgba(255,255,255,0.9)", fontSize:"15px", fontWeight:500, boxSizing:"border-box" }} />
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginBottom:"24px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px", padding:"0 4px" }}>
              <label style={{ fontSize:"10px", fontWeight:800, letterSpacing:"0.13em",
                textTransform:"uppercase", color:"rgba(255,255,255,0.3)" }}>Пароль</label>
              <button style={{ fontSize:"12px", color:"rgba(160,110,255,0.95)", fontWeight:700,
                background:"none", border:"none", cursor:"pointer" }}>Забыли?</button>
            </div>
            <div style={{ position:"relative", background: focused==="p" ? "rgba(110,50,255,0.09)" : "rgba(255,255,255,0.04)",
              border:`1px solid ${focused==="p" ? "rgba(110,60,255,0.65)" : "rgba(255,255,255,0.07)"}`,
              borderRadius:"16px", transition:"all 0.2s",
              boxShadow: focused==="p" ? "0 0 0 3px rgba(110,60,255,0.15), 0 0 24px rgba(110,60,255,0.12)" : "none" }}>
              <input type={showPassword?"text":"password"} placeholder="••••••••"
                onFocus={()=>setFocused("p")} onBlur={()=>setFocused(null)}
                style={{ width:"100%", background:"transparent", border:"none", outline:"none",
                  padding:"14px 48px 14px 16px", color:"rgba(255,255,255,0.9)", fontSize:"15px", fontWeight:500, boxSizing:"border-box" }} />
              <button onClick={()=>setShowPassword(!showPassword)}
                style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)",
                  background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.3)" }}>
                {showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}
              </button>
            </div>
          </div>

          {/* Login btn */}
          <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
            style={{ width:"100%", padding:"15px", borderRadius:"16px", border:"none", cursor:"pointer",
              background:"linear-gradient(135deg, #7c3cff 0%, #4d8bff 55%, #00caff 100%)",
              color:"white", fontSize:"15px", fontWeight:800, letterSpacing:"0.01em",
              display:"flex", alignItems:"center", justifyContent:"center", gap:"8px",
              boxShadow:"0 8px 32px rgba(100,60,255,0.45), 0 2px 8px rgba(0,0,0,0.3)",
              marginBottom:"12px" }}>
            Войти <ArrowRight size={15}/>
          </motion.button>

          {/* QR btn */}
          <motion.button whileHover={{ background:"rgba(255,255,255,0.07)" }}
            style={{ width:"100%", padding:"13px", borderRadius:"16px",
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
              cursor:"pointer", color:"rgba(255,255,255,0.55)", fontSize:"13px", fontWeight:700,
              display:"flex", alignItems:"center", justifyContent:"center", gap:"7px" }}>
            <QrCode size={15} style={{ color:"rgba(140,100,255,0.9)" }}/> Войти по QR-коду
          </motion.button>
        </motion.div>

        {/* Register */}
        <motion.button initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.45 }}
          whileHover={{ background:"rgba(255,255,255,0.06)" }}
          style={{ width:"100%", marginTop:"12px", padding:"15px", borderRadius:"20px",
            background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)",
            cursor:"pointer", color:"rgba(255,255,255,0.7)", fontSize:"15px", fontWeight:800 }}>
          Зарегистрироваться
        </motion.button>

        <p style={{ textAlign:"center", fontSize:"11px", color:"rgba(255,255,255,0.18)",
          marginTop:"20px", paddingBottom:"8px" }}>
          Pulse Messenger · Ваши данные надёжно защищены
        </p>
      </motion.div>
    </div>
  );
}
