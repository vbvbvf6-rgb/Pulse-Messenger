import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, QrCode, Zap, Shield } from "lucide-react";

export function Obsidian() {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div style={{
      width:"100%", minHeight:"100vh",
      display:"flex", alignItems:"center", justifyContent:"center",
      background:"#080808",
      fontFamily:"'Inter', system-ui, sans-serif",
      position:"relative", overflow:"hidden",
    }}>
      {/* Deep glow */}
      <div style={{ position:"absolute", top:"-20%", left:"50%", transform:"translateX(-50%)",
        width:"80%", height:"70%", borderRadius:"50%",
        background:"radial-gradient(ellipse, rgba(255,120,30,0.06) 0%, transparent 65%)", filter:"blur(60px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-25%", left:"50%", transform:"translateX(-50%)",
        width:"70%", height:"60%", borderRadius:"50%",
        background:"radial-gradient(ellipse, rgba(255,80,20,0.04) 0%, transparent 65%)", filter:"blur(60px)", pointerEvents:"none" }} />

      {/* Subtle grid */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:0.03,
        backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize:"60px 60px" }} />

      <motion.div initial={{ opacity:0, y:28, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }}
        transition={{ duration:0.85, ease:[0.16,1,0.3,1] }}
        style={{ width:"100%", maxWidth:"380px", padding:"0 20px", position:"relative", zIndex:10 }}>

        {/* Logo */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"40px" }}>
          <motion.div initial={{ scale:0.5, opacity:0 }} animate={{ scale:1, opacity:1 }}
            transition={{ type:"spring", stiffness:160, damping:18, delay:0.1 }}
            style={{ width:"88px", height:"88px", borderRadius:"28px",
              background:"linear-gradient(145deg, #1c1c1c 0%, #141414 100%)",
              border:"1px solid rgba(255,255,255,0.08)",
              display:"flex", alignItems:"center", justifyContent:"center",
              marginBottom:"22px",
              boxShadow:"0 0 0 1px rgba(255,120,30,0.12), 0 8px 40px rgba(0,0,0,0.8), 0 0 60px rgba(255,100,20,0.08), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
            <Zap size={40} style={{ color:"#ff7820", filter:"drop-shadow(0 0 16px rgba(255,120,30,0.7))" }} />
          </motion.div>

          <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
            <h1 style={{ fontSize:"42px", fontWeight:900, letterSpacing:"-2px", color:"#ffffff",
              textAlign:"center", marginBottom:"6px", lineHeight:1 }}>
              Pulse
            </h1>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}>
              <div style={{ height:"1px", width:"24px", background:"rgba(255,255,255,0.12)" }} />
              <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"13px", fontWeight:600, letterSpacing:"0.06em" }}>
                ДОБРО ПОЖАЛОВАТЬ
              </p>
              <div style={{ height:"1px", width:"24px", background:"rgba(255,255,255,0.12)" }} />
            </div>
          </motion.div>
        </div>

        {/* Card */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.6 }}
          style={{ background:"linear-gradient(160deg, rgba(26,26,26,0.98) 0%, rgba(18,18,18,0.98) 100%)",
            border:"1px solid rgba(255,255,255,0.06)", borderRadius:"28px", padding:"30px 26px",
            boxShadow:"0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06)" }}>

          {/* Username */}
          <div style={{ marginBottom:"18px" }}>
            <label style={{ display:"block", fontSize:"10px", fontWeight:800, letterSpacing:"0.15em",
              textTransform:"uppercase", color:"rgba(255,255,255,0.28)", marginBottom:"9px", paddingLeft:"2px" }}>
              Имя или никнейм
            </label>
            <div style={{ background: focused==="u" ? "rgba(255,120,30,0.06)" : "rgba(255,255,255,0.035)",
              border:`1px solid ${focused==="u" ? "rgba(255,120,30,0.4)" : "rgba(255,255,255,0.06)"}`,
              borderRadius:"14px", transition:"all 0.2s",
              boxShadow: focused==="u" ? "0 0 0 3px rgba(255,120,30,0.1)" : "none" }}>
              <input type="text" placeholder="@никнейм или имя"
                onFocus={()=>setFocused("u")} onBlur={()=>setFocused(null)}
                style={{ width:"100%", background:"transparent", border:"none", outline:"none",
                  padding:"14px 16px", color:"rgba(255,255,255,0.9)", fontSize:"15px", fontWeight:500, boxSizing:"border-box" }} />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom:"26px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"9px", padding:"0 2px" }}>
              <label style={{ fontSize:"10px", fontWeight:800, letterSpacing:"0.15em",
                textTransform:"uppercase", color:"rgba(255,255,255,0.28)" }}>Пароль</label>
              <button style={{ fontSize:"12px", color:"rgba(255,120,40,0.9)", fontWeight:700,
                background:"none", border:"none", cursor:"pointer" }}>Забыли?</button>
            </div>
            <div style={{ position:"relative", background: focused==="p" ? "rgba(255,120,30,0.06)" : "rgba(255,255,255,0.035)",
              border:`1px solid ${focused==="p" ? "rgba(255,120,30,0.4)" : "rgba(255,255,255,0.06)"}`,
              borderRadius:"14px", transition:"all 0.2s",
              boxShadow: focused==="p" ? "0 0 0 3px rgba(255,120,30,0.1)" : "none" }}>
              <input type={showPassword?"text":"password"} placeholder="••••••••"
                onFocus={()=>setFocused("p")} onBlur={()=>setFocused(null)}
                style={{ width:"100%", background:"transparent", border:"none", outline:"none",
                  padding:"14px 48px 14px 16px", color:"rgba(255,255,255,0.9)", fontSize:"15px", fontWeight:500, boxSizing:"border-box" }} />
              <button onClick={()=>setShowPassword(!showPassword)}
                style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)",
                  background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.28)" }}>
                {showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}
              </button>
            </div>
          </div>

          {/* Login btn */}
          <motion.button whileHover={{ scale:1.015, boxShadow:"0 12px 40px rgba(255,100,20,0.45)" }} whileTap={{ scale:0.975 }}
            style={{ width:"100%", padding:"15px", borderRadius:"14px", border:"none", cursor:"pointer",
              background:"linear-gradient(135deg, #ff7820 0%, #ff4d10 100%)",
              color:"white", fontSize:"15px", fontWeight:800,
              boxShadow:"0 8px 28px rgba(255,100,20,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
              marginBottom:"14px" }}>
            Войти
          </motion.button>

          {/* QR btn */}
          <motion.button whileHover={{ background:"rgba(255,255,255,0.05)" }}
            style={{ width:"100%", padding:"13px", borderRadius:"14px",
              background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
              cursor:"pointer", color:"rgba(255,255,255,0.45)", fontSize:"13px", fontWeight:600,
              display:"flex", alignItems:"center", justifyContent:"center", gap:"7px" }}>
            <QrCode size={15} style={{ color:"rgba(255,120,40,0.7)" }}/> Войти по QR-коду
          </motion.button>
        </motion.div>

        {/* Register */}
        <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          whileHover={{ background:"rgba(255,255,255,0.04)" }}
          style={{ width:"100%", marginTop:"12px", padding:"15px", borderRadius:"20px",
            background:"transparent", border:"1px solid rgba(255,255,255,0.07)",
            cursor:"pointer", color:"rgba(255,255,255,0.55)", fontSize:"15px", fontWeight:700 }}>
          Зарегистрироваться
        </motion.button>

        {/* Security badge */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"5px",
          marginTop:"20px", paddingBottom:"8px" }}>
          <Shield size={10} style={{ color:"rgba(255,255,255,0.18)" }}/>
          <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.18)" }}>
            Pulse Messenger · Ваши данные надёжно защищены
          </p>
        </div>
      </motion.div>
    </div>
  );
}
