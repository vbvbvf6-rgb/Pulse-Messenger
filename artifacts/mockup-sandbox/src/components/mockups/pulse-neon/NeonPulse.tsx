import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, QrCode, Zap } from "lucide-react";

export function NeonPulse() {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div style={{
      width:"100%", minHeight:"100vh",
      display:"flex", alignItems:"center", justifyContent:"center",
      background:"#020208",
      fontFamily:"'Inter', system-ui, sans-serif",
      position:"relative", overflow:"hidden",
    }}>
      {/* Neon corner glows */}
      <div style={{ position:"absolute", top:"-15%", left:"-10%", width:"55%", height:"55%", borderRadius:"50%",
        background:"radial-gradient(ellipse, rgba(0,240,200,0.12) 0%, transparent 65%)", filter:"blur(60px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"10%", right:"-15%", width:"50%", height:"55%", borderRadius:"50%",
        background:"radial-gradient(ellipse, rgba(200,0,255,0.1) 0%, transparent 65%)", filter:"blur(70px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-15%", left:"20%", width:"60%", height:"50%", borderRadius:"50%",
        background:"radial-gradient(ellipse, rgba(0,180,255,0.08) 0%, transparent 65%)", filter:"blur(80px)", pointerEvents:"none" }} />

      {/* Scanline effect */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:0.025,
        backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,200,0.3) 2px, rgba(0,240,200,0.3) 3px)",
        backgroundSize:"100% 3px" }} />

      {/* Grid */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:0.04,
        backgroundImage:"linear-gradient(rgba(0,240,200,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,200,0.5) 1px, transparent 1px)",
        backgroundSize:"50px 50px" }} />

      {/* Animated neon lines */}
      <motion.div animate={{ x:[-200, 600], opacity:[0,0.6,0.6,0] }}
        transition={{ duration:4, repeat:Infinity, repeatDelay:6, ease:"linear" }}
        style={{ position:"absolute", top:"30%", width:"200px", height:"1px",
          background:"linear-gradient(90deg, transparent, rgba(0,240,200,0.9), transparent)",
          filter:"blur(0.5px)", pointerEvents:"none" }} />
      <motion.div animate={{ x:[600, -200], opacity:[0,0.5,0.5,0] }}
        transition={{ duration:5, repeat:Infinity, repeatDelay:8, delay:3, ease:"linear" }}
        style={{ position:"absolute", top:"65%", width:"180px", height:"1px",
          background:"linear-gradient(90deg, transparent, rgba(200,0,255,0.8), transparent)",
          filter:"blur(0.5px)", pointerEvents:"none" }} />

      <motion.div initial={{ opacity:0, y:28, scale:0.96 }} animate={{ opacity:1, y:0, scale:1 }}
        transition={{ duration:0.85, ease:[0.16,1,0.3,1] }}
        style={{ width:"100%", maxWidth:"380px", padding:"0 20px", position:"relative", zIndex:10 }}>

        {/* Logo */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"38px" }}>
          <motion.div initial={{ scale:0.5, opacity:0 }} animate={{ scale:1, opacity:1 }}
            transition={{ type:"spring", stiffness:160, damping:16, delay:0.1 }}
            style={{ position:"relative", marginBottom:"22px" }}>
            <div style={{ width:"80px", height:"80px", borderRadius:"22px",
              background:"rgba(0,240,200,0.05)",
              border:"1px solid rgba(0,240,200,0.3)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 0 30px rgba(0,240,200,0.15), 0 0 60px rgba(0,240,200,0.08), inset 0 0 20px rgba(0,240,200,0.05)" }}>
              <Zap size={38} style={{ color:"#00f0c8", filter:"drop-shadow(0 0 10px rgba(0,240,200,0.9)) drop-shadow(0 0 20px rgba(0,240,200,0.5))" }} />
            </div>
            {/* Corner accents */}
            <div style={{ position:"absolute", top:-3, left:-3, width:12, height:12,
              borderTop:"2px solid rgba(0,240,200,0.8)", borderLeft:"2px solid rgba(0,240,200,0.8)", borderRadius:"2px 0 0 0" }} />
            <div style={{ position:"absolute", top:-3, right:-3, width:12, height:12,
              borderTop:"2px solid rgba(0,240,200,0.8)", borderRight:"2px solid rgba(0,240,200,0.8)", borderRadius:"0 2px 0 0" }} />
            <div style={{ position:"absolute", bottom:-3, left:-3, width:12, height:12,
              borderBottom:"2px solid rgba(0,240,200,0.8)", borderLeft:"2px solid rgba(0,240,200,0.8)", borderRadius:"0 0 0 2px" }} />
            <div style={{ position:"absolute", bottom:-3, right:-3, width:12, height:12,
              borderBottom:"2px solid rgba(0,240,200,0.8)", borderRight:"2px solid rgba(0,240,200,0.8)", borderRadius:"0 0 2px 0" }} />
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
            style={{ fontSize:"40px", fontWeight:900, letterSpacing:"-0.5px", marginBottom:"6px",
              color:"#00f0c8", textShadow:"0 0 20px rgba(0,240,200,0.8), 0 0 40px rgba(0,240,200,0.4), 0 0 80px rgba(0,240,200,0.2)",
              textAlign:"center" }}>
            PULSE
          </motion.h1>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.35 }}
            style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <motion.div animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:1.5, repeat:Infinity }}
              style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#00f0c8",
                boxShadow:"0 0 8px rgba(0,240,200,0.9)" }} />
            <span style={{ color:"rgba(0,240,200,0.5)", fontSize:"11px", fontWeight:700, letterSpacing:"0.2em" }}>
              СИСТЕМА ОНЛАЙН
            </span>
            <motion.div animate={{ opacity:[0.4,1,0.4] }} transition={{ duration:1.5, repeat:Infinity, delay:0.5 }}
              style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#00f0c8",
                boxShadow:"0 0 8px rgba(0,240,200,0.9)" }} />
          </motion.div>
        </div>

        {/* Card */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.28, duration:0.6 }}
          style={{ position:"relative", background:"rgba(0,240,200,0.02)",
            border:"1px solid rgba(0,240,200,0.15)", borderRadius:"20px", padding:"28px 24px",
            boxShadow:"0 0 40px rgba(0,240,200,0.06), 0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(0,240,200,0.08)" }}>
          {/* Card corner accents */}
          <div style={{ position:"absolute", top:-1, left:-1, width:20, height:20,
            borderTop:"1px solid rgba(0,240,200,0.6)", borderLeft:"1px solid rgba(0,240,200,0.6)", borderRadius:"20px 0 0 0" }} />
          <div style={{ position:"absolute", top:-1, right:-1, width:20, height:20,
            borderTop:"1px solid rgba(0,240,200,0.6)", borderRight:"1px solid rgba(0,240,200,0.6)", borderRadius:"0 20px 0 0" }} />
          <div style={{ position:"absolute", bottom:-1, left:-1, width:20, height:20,
            borderBottom:"1px solid rgba(0,240,200,0.6)", borderLeft:"1px solid rgba(0,240,200,0.6)", borderRadius:"0 0 0 20px" }} />
          <div style={{ position:"absolute", bottom:-1, right:-1, width:20, height:20,
            borderBottom:"1px solid rgba(0,240,200,0.6)", borderRight:"1px solid rgba(0,240,200,0.6)", borderRadius:"0 0 20px 0" }} />

          {/* Username */}
          <div style={{ marginBottom:"16px" }}>
            <label style={{ display:"block", fontSize:"10px", fontWeight:800, letterSpacing:"0.18em",
              textTransform:"uppercase", color:"rgba(0,240,200,0.5)", marginBottom:"8px", paddingLeft:"2px" }}>
              // Идентификатор
            </label>
            <div style={{ background: focused==="u" ? "rgba(0,240,200,0.05)" : "rgba(0,240,200,0.02)",
              border:`1px solid ${focused==="u" ? "rgba(0,240,200,0.5)" : "rgba(0,240,200,0.12)"}`,
              borderRadius:"12px", transition:"all 0.2s",
              boxShadow: focused==="u" ? "0 0 0 2px rgba(0,240,200,0.08), 0 0 20px rgba(0,240,200,0.08)" : "none" }}>
              <input type="text" placeholder="@никнейм или имя"
                onFocus={()=>setFocused("u")} onBlur={()=>setFocused(null)}
                style={{ width:"100%", background:"transparent", border:"none", outline:"none",
                  padding:"13px 16px", color:"rgba(0,240,200,0.9)", fontSize:"14px", fontWeight:500,
                  boxSizing:"border-box", caretColor:"#00f0c8" }} />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom:"24px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px", padding:"0 2px" }}>
              <label style={{ fontSize:"10px", fontWeight:800, letterSpacing:"0.18em",
                textTransform:"uppercase", color:"rgba(0,240,200,0.5)" }}>// Ключ доступа</label>
              <button style={{ fontSize:"11px", color:"rgba(200,0,255,0.8)", fontWeight:700,
                background:"none", border:"none", cursor:"pointer", letterSpacing:"0.05em" }}>СБРОС?</button>
            </div>
            <div style={{ position:"relative", background: focused==="p" ? "rgba(0,240,200,0.05)" : "rgba(0,240,200,0.02)",
              border:`1px solid ${focused==="p" ? "rgba(0,240,200,0.5)" : "rgba(0,240,200,0.12)"}`,
              borderRadius:"12px", transition:"all 0.2s",
              boxShadow: focused==="p" ? "0 0 0 2px rgba(0,240,200,0.08), 0 0 20px rgba(0,240,200,0.08)" : "none" }}>
              <input type={showPassword?"text":"password"} placeholder="••••••••"
                onFocus={()=>setFocused("p")} onBlur={()=>setFocused(null)}
                style={{ width:"100%", background:"transparent", border:"none", outline:"none",
                  padding:"13px 48px 13px 16px", color:"rgba(0,240,200,0.9)", fontSize:"14px", fontWeight:500,
                  boxSizing:"border-box", caretColor:"#00f0c8" }} />
              <button onClick={()=>setShowPassword(!showPassword)}
                style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)",
                  background:"none", border:"none", cursor:"pointer", color:"rgba(0,240,200,0.35)" }}>
                {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>

          {/* Login btn */}
          <motion.button whileHover={{ scale:1.02, boxShadow:"0 0 40px rgba(0,240,200,0.35), 0 8px 30px rgba(0,0,0,0.5)" }}
            whileTap={{ scale:0.97 }}
            style={{ width:"100%", padding:"15px", borderRadius:"12px", border:"1px solid rgba(0,240,200,0.4)",
              cursor:"pointer", background:"rgba(0,240,200,0.08)",
              color:"#00f0c8", fontSize:"14px", fontWeight:800, letterSpacing:"0.1em",
              textShadow:"0 0 10px rgba(0,240,200,0.8)",
              boxShadow:"0 0 20px rgba(0,240,200,0.12), inset 0 0 20px rgba(0,240,200,0.05)",
              marginBottom:"12px", textTransform:"uppercase" }}>
            [ ВОЙТИ В СИСТЕМУ ]
          </motion.button>

          {/* QR btn */}
          <motion.button whileHover={{ background:"rgba(200,0,255,0.07)", borderColor:"rgba(200,0,255,0.4)" }}
            style={{ width:"100%", padding:"12px", borderRadius:"12px",
              background:"rgba(200,0,255,0.03)", border:"1px solid rgba(200,0,255,0.15)",
              cursor:"pointer", color:"rgba(200,0,255,0.6)", fontSize:"12px", fontWeight:700,
              display:"flex", alignItems:"center", justifyContent:"center", gap:"7px",
              letterSpacing:"0.05em", transition:"all 0.2s" }}>
            <QrCode size={14}/> QR АВТОРИЗАЦИЯ
          </motion.button>
        </motion.div>

        {/* Register */}
        <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          whileHover={{ background:"rgba(0,240,200,0.05)", borderColor:"rgba(0,240,200,0.25)" }}
          style={{ width:"100%", marginTop:"12px", padding:"15px", borderRadius:"16px",
            background:"transparent", border:"1px solid rgba(0,240,200,0.1)",
            cursor:"pointer", color:"rgba(255,255,255,0.5)", fontSize:"14px", fontWeight:700,
            letterSpacing:"0.05em", transition:"all 0.2s" }}>
          ЗАРЕГИСТРИРОВАТЬСЯ
        </motion.button>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", marginTop:"20px" }}>
          <motion.div animate={{ opacity:[0.3,0.8,0.3] }} transition={{ duration:2, repeat:Infinity }}
            style={{ width:"4px", height:"4px", borderRadius:"50%", background:"rgba(0,240,200,0.6)" }} />
          <p style={{ fontSize:"10px", color:"rgba(0,240,200,0.25)", letterSpacing:"0.1em" }}>
            PULSE MESSENGER · ШИФРОВАНИЕ АКТИВНО
          </p>
          <motion.div animate={{ opacity:[0.3,0.8,0.3] }} transition={{ duration:2, repeat:Infinity, delay:1 }}
            style={{ width:"4px", height:"4px", borderRadius:"50%", background:"rgba(0,240,200,0.6)" }} />
        </div>
      </motion.div>
    </div>
  );
}
