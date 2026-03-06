// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

/* ─── Skin palette (mixed race: warm medium brown) ─────────────────── */
const S = '#C4844A';   // main skin
const SL = '#D4986A';  // lighter highlight skin
const SH = '#B87040';  // shadow/darker skin

export default function Hero() {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.6, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } }
    };

    const rightVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } }
    };

    const stats = [
        { label: "STR", value: 9, desc: "Backend Resilience", abbr: "STRENGTH" },
        { label: "INT", value: 10, desc: "System Architecture", abbr: "INTELLIGENCE" },
        { label: "AGI", value: 8, desc: "UI Responsiveness", abbr: "AGILITY" },
        { label: "LCK", value: 7, desc: "Debug Success Rate", abbr: "LUCK" },
    ];

    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-black py-24 lg:py-0">

            {/* ── Vault Boy styles + animation ── */}
            <style>{`
                /* ── Thumbs-up arm swing ── */
                @keyframes thumbsUp {
                    0%, 100%  { transform: rotate(0deg)   translateY(0px)   scale(1);    }
                    35%, 65%  { transform: rotate(-22deg) translateY(-10px) scale(1.04); }
                }
                .left-arm-group {
                    transform-origin: 98px 86px; /* shoulder pivot */
                    animation: thumbsUp 2.6s cubic-bezier(0.45,0,0.55,1) infinite;
                }

                /* ── Vault Boy base ── */
                .vault-boy { position:relative; width:200px; height:300px; }

                /* Left Foot */
                .left-foot-1{position:absolute;width:8px;height:12px;top:267px;left:103px;border:2px solid #231F20;background-color:#A6A8AB;border-radius:50%}
                .left-foot-2{position:absolute;width:40px;height:10px;top:270px;left:70px;border:2px solid #231F20;background-color:#A6A8AB;border-radius:50%;transform:rotate(-13deg)}
                .left-foot-3{position:absolute;width:10px;height:23px;top:258px;left:104px;background-color:#A6A8AB;border-radius:50%}
                /* Left Leg */
                .left-leg-1{position:absolute;width:7px;height:80px;top:192px;left:86px;background-color:#45768E;border-radius:50%;border-left:3px solid #231F20;transform:rotate(4deg)}
                .left-leg-2{position:absolute;width:68px;height:22px;top:180px;left:90px;background-color:#45768E;border-left:2px solid #231F20}
                .left-leg-3{position:absolute;width:36px;height:70px;top:200px;left:92px;background-color:#45768E}
                .left-leg-3:after{content:"";position:absolute;width:10px;height:70px;background-color:#45768E;border-left:2px solid #231F20;border-radius:50%;transform:rotate(13deg);top:3px;left:28px}
                .left-leg-4{position:absolute;width:30px;height:14px;top:260px;left:87px;background-color:#45768E;border-bottom:2px solid #231F20;border-radius:50%}
                .left-leg-4:before{content:"";position:absolute;width:2px;height:12px;background-color:#231F20;top:0;left:-1px;transform:rotate(-5deg);border-bottom-left-radius:100%}
                .left-leg-4:after{content:"";position:absolute;width:2px;height:14px;background-color:#231F20;top:-3px;left:29px;transform:rotate(3deg);border-bottom-right-radius:100%}
                /* Right Foot */
                .right-foot{position:absolute;width:19px;height:30px;border-left:3px solid #231F20;border-radius:50%;top:263px;left:160px;transform:rotate(-40deg);background-color:#A6A8AB;border-right:2px solid #231F20;border-bottom:3px solid #231F20}
                /* Right Leg */
                .right-leg-1{position:absolute;width:24px;height:108px;top:167px;left:147px;background-color:#45768E;border:2px solid #231F20;border-radius:50%;transform:rotate(-20deg)}
                .right-leg-2{position:absolute;width:51px;height:89px;top:186px;left:128px;background-color:#45768E;border-top-right-radius:100%;border-bottom-right-radius:8%}
                .right-leg-2:after{content:"";position:absolute;width:6px;height:56px;background-color:#45768E;border-radius:50%;top:28px;left:8px;transform:rotate(-25deg);border-right:2px solid #231F20}
                .right-leg-3{position:absolute;width:27px;height:12px;top:264px;left:156px;background-color:#45768E;border-bottom:2px solid #231F20;border-radius:50%;transform:rotate(-4deg)}
                .right-leg-3:before{content:"";position:absolute;width:2px;height:11px;background-color:#231F20;top:0;left:26px;border-top-right-radius:50%;border-bottom-right-radius:50%;transform:rotate(10deg)}
                .right-leg-3:after{content:"";position:absolute;width:2px;height:16px;background-color:#231F20;top:-4px;left:-2px;border-top-left-radius:50%;border-bottom-left-radius:50%;transform:rotate(-26deg)}
                .right-leg-4{position:absolute;width:10px;height:20px;top:209px;left:119px;border-right:1px solid #231F20;transform:rotate(-32deg);border-top-right-radius:20%}
                /* Thigh Gap */
                .thigh-gap-1{position:absolute;width:6px;height:51px;background-color:transparent;top:221px;left:126px;border-top-right-radius:20%;border-top-left-radius:20%}
                .thigh-gap-2{position:absolute;width:33px;height:30px;background-color:transparent;top:246px;left:121px;border-top-right-radius:100%}
                .thigh-gap-3{position:absolute;width:10px;height:24px;background-color:transparent;top:233px;left:130px;transform:rotate(-32deg)}
                .thigh-gap-4{position:absolute;width:10px;height:11px;background-color:transparent;top:270px;left:146px;transform:rotate(-36deg)}
                .thigh-gap-5{position:absolute;width:12px;height:7px;background-color:transparent;top:265px;left:116px;border-top-left-radius:70%;transform:rotate(-30deg)}
                /* Stripe Bottom */
                .stripe-bottom-1{position:absolute;width:67px;height:17px;top:169px;left:90px;background-color:#CFCC7B;border-radius:50%;border-bottom:3px solid #231F20;transform:rotate(1deg)}
                .stripe-bottom-1:before{content:"";position:absolute;width:2px;height:12px;background-color:#231F20;top:3px;left:-1px;transform:rotate(-7deg);border-bottom-left-radius:50%}
                .stripe-bottom-1:after{content:"";position:absolute;width:2px;height:15px;background-color:#231F20;top:1px;left:66px;transform:rotate(-11deg);border-top-left-radius:90%}
                .stripe-bottom-2{position:absolute;width:66px;height:26px;background-color:#CFCC7B;top:153px;left:88px;border-left:2px solid #231F20;transform:rotate(-3deg);border-bottom-left-radius:40%}
                .stripe-bottom-2:after{content:"";position:absolute;width:15px;height:6px;background-color:#CFCC7B;top:18px;left:0;transform:rotate(21deg);border-bottom-left-radius:49%}
                .stripe-bottom-3{position:absolute;width:10px;height:10px;background-color:#CFCC7B;top:163px;left:100px;z-index:20;transform:rotate(-45deg)}
                /* Stripe Middle */
                .stripe-middle{position:absolute;background-color:#CFCC7B;width:11px;height:120px;top:60px;left:104px;border-top-left-radius:80%;border-bottom-left-radius:50%;transform:rotate(2deg);border-left:2px solid #231F20}
                .stripe-middle:after{content:"";position:absolute;background-color:#CFCC7B;width:20px;height:120px}
                /* Arm Left */
                .arm-left-1{position:absolute;width:53px;height:27px;top:86px;left:48px;background-color:#45768E}
                .arm-left-1:after{content:"";position:absolute;width:70px;height:10px;top:-6px;left:-2px;background-color:#45768E;border-bottom:2px solid #231F20;border-radius:50%}
                .arm-left-2{position:absolute;width:50px;height:10px;top:109px;left:39px;border-bottom:2px solid #231F20;border-radius:50%;transform:rotate(-11deg);background-color:#45768E}
                /* Wrist Left */
                .wrist-left{position:absolute;width:20px;height:35px;top:86px;left:31px;background-color:${S};border-radius:50%;border-right:2px solid #231F20;transform:rotate(13deg)}
                /* Hand Left */
                .hand-left-1{position:absolute;width:15px;height:29px;top:92px;left:27px;background-color:${S};border-radius:50%;transform:rotate(31deg);border-right:2px solid #231F20}
                .hand-left-2{position:absolute;width:10px;height:19px;top:83px;left:36px;background-color:${S};border-radius:50%;transform:rotate(7deg);border-right:2px solid #231F20}
                .hand-left-3{position:absolute;width:24px;height:31px;top:53px;left:20px;transform:rotate(0deg);background-color:${S};border-left:2px solid #231F20;border-top-left-radius:50%;border-bottom-left-radius:82%;border-top:2px solid #231F20;border-top-right-radius:80%}
                .hand-left-4{position:absolute;width:11px;height:15px;border-radius:50%;background-color:${S};top:53px;left:21px;transform:rotate(40deg);border:2px solid #231F20}
                .hand-left-4:after{content:"";position:absolute;height:15px;width:12px;background-color:inherit;border-radius:50%;top:3px;left:1px;transform:rotate(-25deg)}
                .hand-left-5{position:absolute;width:14px;height:19px;top:58px;left:33px;background-color:${S};border-radius:80%;border-left:2px solid #231F20;transform:rotate(-3deg)}
                .hand-left-5:after{content:"";position:absolute;background-color:inherit;width:10px;height:17px;top:-13px;left:0;transform:rotate(-17deg)}
                .hand-left-6{position:absolute;width:4px;height:20px;top:71px;left:37px;background-color:${S};border-radius:50%;transform:rotate(-39deg);border-right:2px solid #231F20}
                .hand-left-6:after{content:"";position:absolute;width:6px;height:12px;top:5px;left:6px;background-color:transparent;transform:rotate(4deg)}
                .hand-left-7{position:absolute;width:8px;height:3px;top:55px;left:30px;border-radius:50%;border-top:2px solid #231F20;transform:rotate(73deg)}
                .hand-left-8{position:absolute;width:6px;height:8px;top:83px;left:30px;border-right:4px solid ${S};border-radius:50%;transform:rotate(-22deg)}
                .hand-left-9{position:absolute;width:25px;height:11px;top:106px;left:11px;transform:rotate(12deg);background-color:${S};border-bottom:2px solid #231F20;border-bottom-right-radius:50%;border-bottom-left-radius:100%}
                .hand-left-10{position:absolute;width:27px;height:17px;top:78px;left:7px;background-color:${S};border-radius:50%;transform:rotate(9deg);border:2px solid #231F20}
                .hand-left-10:after{content:"";position:absolute;width:25px;height:10px;border-radius:50%;transform:rotate(-2deg);background-color:${S};left:1px;top:1px}
                .hand-left-11{position:absolute;width:27px;height:13px;top:91px;left:8px;background-color:${S};border-radius:50%;transform:rotate(9deg);border:2px solid #231F20}
                .hand-left-11:after{position:absolute;height:8px;background-color:${S};width:23px;border-radius:50%;transform:rotate(-2deg);content:"";left:1px}
                .hand-left-12{position:absolute;width:23px;height:9px;top:103px;left:11px;background-color:${S};border-radius:50%;transform:rotate(9deg);border:2px solid #231F20}
                .hand-left-12:after{position:absolute;height:7px;background-color:${S};width:19px;border-radius:50%;transform:rotate(-2deg);content:""}
                /* Suit Left */
                .suit-left-1{position:absolute;width:6px;height:47px;top:110px;left:85px;background-color:#45768E;border-left:2px solid #231F20;border-radius:50%}
                .suit-left-2{position:absolute;width:21px;height:4px;top:155px;left:86px;border-bottom:2px solid #231F20;transform:rotate(25deg);border-radius:50%}
                .suit-left-3{position:absolute;width:19px;height:62px;top:93px;left:90px;background-color:#45768E}
                .suit-left-3:after{content:"";position:absolute;width:18px;height:10px;background-color:#45768E;top:57px;transform:rotate(27deg)}
                .suit-left-4{position:absolute;width:4px;height:5px;top:157px;left:99px;border-right:2px solid #231F20;border-bottom:1px solid #231F20;border-bottom-right-radius:50%;border-bottom-left-radius:50%;transform:rotate(6deg)}
                /* Suit Right */
                .suit-right-1{position:absolute;width:37px;height:57px;top:100px;left:125px;background-color:#45768E}
                .suit-right-1:after{content:"";position:absolute;width:10px;height:4px;top:56px;background-color:#45768E}
                .suit-right-2{position:absolute;width:10px;height:61px;top:100px;left:121px;background-color:#45768E;border-left:2px solid #231F20;border-radius:50%;transform:rotate(6deg)}
                .suit-right-3{position:absolute;width:6px;height:32px;top:131px;left:121px;background-color:#45768E;border-bottom:2px solid #231F20;border-left:2px solid #231F20;border-bottom-left-radius:50%}
                .suit-right-4{position:absolute;width:31px;height:6px;top:156px;left:124px;background-color:#45768E;border-bottom:2px solid #231F20;transform:rotate(-11deg);border-radius:50%}
                /* Waist Right */
                .waist-right{position:absolute;width:10px;height:48px;background-color:#45768E;border-left:2px solid #231F20;top:130px;left:155px;transform:rotate(8deg);border-radius:50%}
                /* Hand Right */
                .hand-right-1{position:absolute;width:7px;height:5px;top:171px;left:167px;background-color:${S};transform:rotate(19deg)}
                .hand-right-2{position:absolute;width:10px;height:19px;top:161px;left:156px;background-color:${S};border-radius:50%;border-left:2px solid #231F20;transform:rotate(18deg)}
                .hand-right-3{position:absolute;width:18px;height:14px;top:173px;left:161px;background-color:${S};border-bottom:2px solid #231F20}
                .hand-right-4{position:absolute;width:7px;height:15px;top:172px;left:156px;background-color:${S};border-radius:50%;transform:rotate(-19deg);border-left:2px solid #231F20}
                .hand-right-4:after{content:"";position:absolute;width:2px;height:6px;background-color:#231F20;top:11px;left:-1px;border-radius:50%;transform:rotate(-26deg)}
                .hand-right-5{position:absolute;width:7px;height:10px;top:172px;left:172px;background-color:${S};border-radius:50%;border-left:2px solid #231F20;border-top:2px solid #231F20;border-right:2px solid #231F20}
                .hand-right-6{position:absolute;width:7px;height:12px;top:175px;left:174px;background-color:${S};border-radius:50%;transform:rotate(16deg);border-right:2px solid #231F20}
                .hand-right-6:after{content:"";position:absolute;width:2px;height:7px;background-color:#231F20;border-radius:50%;top:7px;left:6px;transform:rotate(17deg)}
                .hand-right-7{position:absolute;width:3px;height:3px;top:180px;left:173px;background-color:#231F20;border-radius:50%}
                /* Arm Right */
                .arm-right-1{position:absolute;width:56px;height:10px;top:98px;left:140px;background-color:#45768E;border-radius:50%;border-top:2px solid #231F20;transform:rotate(35deg)}
                .arm-right-1:after{content:"";position:absolute;width:16px;height:12px;border-top:2px solid #231F20;background-color:#45768E;transform:rotate(-6deg);top:-1px;left:6px}
                .arm-right-2{position:absolute;width:35px;height:6px;top:114px;left:170px;background-color:#45768E;border-top:2px solid #231F20;border-radius:50%;transform:rotate(49deg)}
                .arm-right-3{position:absolute;width:29px;height:10px;top:122px;left:149px;background-color:#45768E;border-bottom:2px solid #231F20;transform:rotate(20deg);border-bottom-left-radius:40%;border-bottom-right-radius:40%}
                .arm-right-4{position:absolute;width:22px;height:30px;top:105px;left:161px;background-color:#45768E;border-top-right-radius:50%;border-bottom-left-radius:60%}
                .arm-right-5{position:absolute;width:10px;height:50px;top:125px;left:181px;background-color:#45768E;border-right:2px solid #231F20;transform:rotate(26deg);border-radius:50%}
                .arm-right-6{position:absolute;width:10px;height:32px;top:134px;left:163px;background-color:#45768E;border-left:2px solid #231F20;border-radius:50%;transform:rotate(26deg)}
                .arm-right-7{position:absolute;width:21px;height:9px;top:160px;left:160px;background-color:#45768E;border-bottom:2px solid #231F20;transform:rotate(30deg);border-radius:50%}
                .arm-right-8{position:absolute;width:17px;height:45px;top:119px;left:174px;background-color:#45768E;transform:rotate(20deg);border-top-right-radius:40%}
                /* Collar */
                .collar{position:absolute;width:47px;height:40px;background-color:#CFCC7B;border-radius:50%;top:69px;left:100px;border:2px solid #231F20}
                .collar:after{content:"";position:absolute;width:13px;height:10px;background-color:transparent;top:5px;left:39px;transform:rotate(16deg);border-bottom:2px solid #231F20}
                /* Hair Side */
                .hair-side{background-color:#D2D35A;height:10px;width:10px;border-radius:50%;position:absolute;border:2px solid #231F20;left:90px;top:29px}
                /* Neck */
                .neck{position:absolute;width:29px;height:20px;background-color:${S};border:2px solid #231F20;border-radius:50%;transform:rotate(-1deg);top:77px;left:108px}
                /* Head */
                .head{position:absolute;width:60px;height:80px;background-color:${S};border:2px solid #231F20;border-bottom-left-radius:50%;border-top-left-radius:77%;border-top-right-radius:50%;border-bottom-right-radius:70%;top:12px;left:90px}
                .head:after{content:"";position:absolute;width:13px;height:10px;top:72px;left:30px;background-color:${S};border-bottom-right-radius:50%}
                /* Right Ear */
                .right-ear{position:absolute;width:19px;height:13px;border-right:2px solid #231F20;background-color:${S};top:45px;left:44px;border-radius:50%;padding:2px 0 2px 2px;transform:rotate(16deg)}
                /* Head Shading */
                .head-shading{position:absolute;width:44px;height:75px;background-color:transparent;border-bottom-left-radius:50%;border-top-left-radius:77%;border-top-right-radius:50%;border-bottom-right-radius:70%;top:17px;left:93px}
                /* Face */
                .face{position:absolute;top:14px;left:92px}
                .left-eye{height:9px;width:4px;background-color:#231F20;position:absolute;top:30px;left:8px;border-radius:50%}
                .left-eyebrow{width:6px;border-top:2px solid #231F20;top:22px;left:8px;position:absolute;border-top-left-radius:100%;transform:rotate(-11deg)}
                .right-eye{position:absolute;width:12px;height:6px;background-color:#231F20;top:33px;left:31px;transform:rotate(24deg);border-radius:50%}
                .right-eye:after{content:"";position:absolute;width:10px;height:4px;background-color:${S};top:3px;border-radius:50%;left:1px}
                .right-eyebrow{width:9px;border-top:1px solid #231F20;position:absolute;top:23px;left:35px;transform:rotate(41deg);border-top-right-radius:100%;border-bottom:1px solid #231F20;background-color:#231F20}
                .nose{position:absolute;width:12px;height:6px;top:38px;left:14px;transform:rotate(-51deg);border-left:2px solid #231F20;border-top:2px solid #231F20;border-top-left-radius:64%}
                .nose:before{content:"";position:absolute;border-bottom:2px solid #231F20;width:5px;top:-2px;left:10px;border-bottom-right-radius:100%;transform:rotate(-14deg)}
                .bottom-lip{position:absolute;height:10px;width:30px;background-color:transparent;top:51px;left:6px;border-bottom:2px solid #231F20;border-bottom-left-radius:50%;border-bottom-right-radius:50%}
                .top-lip{position:absolute;height:7px;width:30px;background-color:${S};top:49px;left:6px;border-bottom:2px solid #231F20;border-bottom-left-radius:50%;border-bottom-right-radius:50%;transform:rotate(-6deg)}
                .left-lip{border-left:2px solid #231F20;position:absolute;height:10px;width:6px;top:52px;border-radius:50%;left:5px;transform:rotate(-7deg)}
                .right-lip{border-right:2px solid #231F20;position:absolute;height:13px;width:6px;top:49px;border-radius:50%;left:30px;transform:rotate(-38deg)}
                .chin{position:absolute;height:3px;width:8px;top:64px;left:15px;border-bottom:2px solid #231F20;border-bottom-left-radius:50%;border-bottom-right-radius:50%}
                /* Hair */
                .hair{position:absolute;background-color:#D2D35A}
                .hair-1{background-color:inherit;width:14px;height:7px;left:92px;top:23px;transform:rotate(-30deg);border-bottom:2px solid #231F20;border-left:2px solid #231F20;border-top-left-radius:46%;border-bottom-left-radius:40%;border-bottom-right-radius:69%;position:absolute}
                .hair-1:after{content:"";position:absolute;height:10px;width:8px;background-color:inherit;top:-10px;left:5px}
                .hair-2{position:absolute;background-color:inherit;border-top:2px solid #231F20;border-left:2px solid #231F20;border-bottom:2px solid #231F20;border-top-left-radius:105px;border-bottom-left-radius:105px;width:3px;height:19px;left:92px;top:13px;display:block}
                .hair-2:before{content:"";position:absolute;height:8px;width:10px;background-color:transparent;top:-4px;left:2px;border-left:2px solid #231F20;border-bottom:2px solid #231F20;border-bottom-left-radius:75%;border-bottom-right-radius:50%;transform:rotate(-29deg);border-top-left-radius:40%}
                .hair-3{position:absolute;height:18px;width:6px;background-color:inherit;border-left:2px solid #231F20;top:7px;left:107px;transform:rotate(55deg);border-top-left-radius:50%;border-top:2px solid #231F20}
                .hair-4{position:absolute;height:11px;width:4px;background-color:inherit;border-right:3px solid #231F20;top:17px;left:118px;transform:rotate(54deg);border-bottom:2px solid #231F20;border-bottom-right-radius:70%}
                .hair-4:before{content:"";position:absolute;width:5px;height:5px;background-color:inherit;left:-4px}
                .hair-5{position:absolute;height:8px;width:20px;background-color:inherit;top:18px;left:102px;transform:rotate(-35deg)}
                .hair-5:after{content:"";position:absolute;height:6px;width:11px;background-color:${S};border-top:2px solid #231F20;top:5px;transform:rotate(-10deg);border-right:2px solid #231F20;border-top-right-radius:40%}
                .hair-6{position:absolute;height:15px;width:18px;background-color:inherit;border-top:2px solid #231F20;top:6px;left:122px;transform:rotate(41deg);border-top-left-radius:50%;border-left:2px solid #231F20}
                .hair-7{position:absolute;height:12px;width:36px;background-color:inherit;left:125px;top:20px;transform:rotate(30deg);border-radius:30%;border-bottom:2px solid #231F20}
                .hair-8{position:absolute;height:10px;width:8px;background-color:inherit;border-top:2px solid #231F20;top:10px;left:140px;transform:rotate(-5deg);border-top-right-radius:50%;border-right:2px solid #231F20}
                .hair-9{position:absolute;height:18px;width:24px;background-color:inherit;border-top:2px solid #231F20;left:145px;transform:rotate(48deg);top:30px;border-top-right-radius:110%;border-right:2px solid #231F20}
                .hair-9:before{content:"";position:absolute;width:10px;height:14px;top:6px;left:-7px;border-radius:50%;background-color:${S};border:2px solid #231F20;transform:rotate(22deg)}
                .hair-9:after{content:"";position:absolute;width:17px;height:8px;top:16px;left:-7px;background-color:${S};transform:rotate(-12deg);border-bottom-left-radius:69%}
                .hair-10{position:absolute;height:5px;width:10px;background-color:inherit;left:145px;top:22px;transform:rotate(36deg)}
                .hair-11{position:absolute;height:3px;width:9px;background-color:rgba(0,0,0,0);border-top:2px solid #231F20;left:149px;top:19px;transform:rotate(216deg);border-radius:50%}
                /* Sideburns */
                .sideburn1{position:absolute;width:20px;height:10px;left:143px;top:42px;background-color:${S};border-top:2px solid #231F20;transform:rotate(55deg);border-top-right-radius:50%;border-top-left-radius:50%}
                .sideburn1:after{content:"";position:absolute;width:5px;height:11px;background-color:${S};border-right:2px solid #231F20;left:14px;top:1px;transform:rotate(-12deg);border-bottom-right-radius:50%}
                .sideburn2{position:absolute;width:18px;height:5px;left:144px;top:46px;border-top:1px solid #231F20;transform:rotate(55deg);border-top-left-radius:50%;z-index:10;border-top-right-radius:50%}
                .sideburn3{position:absolute;width:15px;height:5px;left:145px;top:50px;border-top:1px solid #231F20;transform:rotate(55deg);border-top-left-radius:50%;z-index:10;border-top-right-radius:50%}
                .sideburn4{position:absolute;width:12px;height:5px;left:146px;top:53px;border-top:1px solid #231F20;transform:rotate(55deg);border-top-left-radius:50%;z-index:10;border-top-right-radius:50%}
                .sideburn4:after{content:"";position:absolute;width:3px;height:3px;top:-1px;left:11px;background-color:transparent}
                .sideburn5{position:absolute;width:5px;height:5px;left:148px;top:56px;border-top:1px solid #231F20;transform:rotate(55deg);border-top-left-radius:50%;z-index:10}
            `}</style>

            {/* Background image + glitch */}
            <div className="image-layer" />

            {/* Vignette + scanline waves */}
            <div className="frame">
                <div /><div /><div />
            </div>

            {/* Gold accent bars */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[--color-vault-gold] z-20 opacity-80" />
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[--color-vault-gold] z-20 opacity-80" />

            {/* Hidden audio */}
            <iframe
                className="vault-audio"
                src="https://www.youtube.com/embed/wiSTfT_AO98?autoplay=1&mute=0&loop=1"
                allow="autoplay"
                loading="eager"
                title="bg-audio"
            />

            {/* ── Vault Boy background character ── */}
            <div
                className="absolute bottom-0 right-0 z-[5] pointer-events-none select-none hidden min-[769px]:block"
                style={{
                    transform: 'scale(1.8)',
                    transformOrigin: 'bottom right',
                    opacity: 0.18,
                    filter: 'sepia(0.3) hue-rotate(60deg)',
                    marginRight: '24px',
                }}
            >
                <div className="vault-boy">
                    <div className="legs">
                        <div className="left-foot">
                            <div className="left-foot-1" />
                            <div className="left-foot-2" />
                            <div className="left-foot-3" />
                        </div>
                        <div className="left-leg">
                            <div className="left-leg-1" />
                            <div className="left-leg-2" />
                            <div className="left-leg-3" />
                            <div className="left-leg-4" />
                        </div>
                        <div className="right-foot" />
                        <div className="right-leg">
                            <div className="right-leg-1" />
                            <div className="right-leg-2" />
                            <div className="right-leg-3" />
                            <div className="right-leg-4" />
                        </div>
                        <div className="thigh-gap">
                            <div className="thigh-gap-1" />
                            <div className="thigh-gap-2" />
                            <div className="thigh-gap-3" />
                            <div className="thigh-gap-4" />
                            <div className="thigh-gap-5" />
                        </div>
                    </div>

                    <div className="body">
                        <div className="stripe-bottom">
                            <div className="stripe-bottom-1" />
                            <div className="stripe-bottom-2" />
                            <div className="stripe-bottom-3" />
                        </div>

                        {/* ── Animated left arm group ── */}
                        <div className="left-arm-group">
                            <div className="arm-left">
                                <div className="arm-left-1" />
                                <div className="arm-left-2" />
                            </div>
                            <div className="wrist-left" />
                            <div className="hand-left">
                                <div className="hand-left-1" /><div className="hand-left-2" /><div className="hand-left-3" />
                                <div className="hand-left-4" /><div className="hand-left-5" /><div className="hand-left-6" />
                                <div className="hand-left-7" /><div className="hand-left-8" /><div className="hand-left-9" />
                                <div className="hand-left-10" /><div className="hand-left-11" /><div className="hand-left-12" />
                            </div>
                        </div>

                        <div className="suit-left">
                            <div className="suit-left-1" /><div className="suit-left-2" />
                            <div className="suit-left-3" /><div className="suit-left-4" />
                        </div>
                        <div className="stripe-middle" />
                        <div className="suit-right">
                            <div className="suit-right-1" /><div className="suit-right-2" />
                            <div className="suit-right-3" /><div className="suit-right-4" />
                        </div>
                        <div className="waist-right" />
                        <div className="hand-right">
                            <div className="hand-right-1" /><div className="hand-right-2" /><div className="hand-right-3" />
                            <div className="hand-right-4" /><div className="hand-right-5" /><div className="hand-right-6" />
                            <div className="hand-right-7" />
                        </div>
                        <div className="arm-right">
                            <div className="arm-right-1" /><div className="arm-right-2" /><div className="arm-right-3" />
                            <div className="arm-right-4" /><div className="arm-right-5" /><div className="arm-right-6" />
                            <div className="arm-right-7" /><div className="arm-right-8" />
                        </div>
                        <div className="collar" />
                    </div>

                    <div className="hair-side" />
                    <div className="neck" />
                    <div className="head"><div className="right-ear" /></div>
                    <div className="head-shading" />

                    <div className="face">
                        <div className="left-eye" />
                        <div className="left-eyebrow" />
                        <div className="right-eye" />
                        <div className="right-eyebrow" />
                        <div className="nose" />
                        <div className="mouth">
                            <div className="bottom-lip" /><div className="top-lip" />
                            <div className="left-lip" /><div className="right-lip" />
                        </div>
                        <div className="chin" />
                    </div>

                    <div className="hair">
                        <div className="hair-1" /><div className="hair-2" /><div className="hair-3" />
                        <div className="hair-4" /><div className="hair-5" /><div className="hair-6" />
                        <div className="hair-7" /><div className="hair-8" /><div className="hair-9" />
                        <div className="hair-10" /><div className="hair-11" />
                        <div className="sideburns">
                            <div className="sideburn1" /><div className="sideburn2" /><div className="sideburn3" />
                            <div className="sideburn4" /><div className="sideburn5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content grid */}
            <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 w-full grid grid-cols-1 min-[769px]:grid-cols-2 gap-10 min-[769px]:gap-16 items-center">

                {/* ── LEFT: Text & CTAs ── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col justify-center min-[769px]:max-w-none"
                >
                    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4 lg:mb-6">
                        <span className="w-2 h-2 rounded-full bg-[--color-vault-gold] animate-pulse flex-shrink-0" />
                        <span className="font-display text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase text-white">
                            // STATUS: CRITICAL_SUCCESS
                        </span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="font-display font-black leading-[0.9] mb-4 lg:mb-6 uppercase">
                        <span className="block text-[clamp(2.8rem,7vw,7rem)] text-white drop-shadow-2xl">
                            FULL STACK
                        </span>
                        <span
                            className="block text-[clamp(2.8rem,7vw,7rem)] text-transparent"
                            style={{ WebkitTextStroke: '2px var(--color-vault-gold)', textShadow: '0 0 40px rgba(232,170,58,0.4)' }}
                        >
                            DEVELOPER
                        </span>
                    </motion.h1>

                    <motion.div
                        variants={itemVariants}
                        className="border-l-[3px] border-white pl-4 lg:pl-5 py-2 mb-6 lg:mb-10 max-w-lg"
                    >
                        <p className="font-sans text-sm lg:text-base text-white/80 italic leading-relaxed">
                            "Architecture for the end of the world."
                        </p>
                        <span className="font-display text-[10px] text-white tracking-[0.3em] uppercase mt-2 block">
                            — Alexander Shamil Modoka, Dev #404
                        </span>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-6 lg:mb-10 max-w-xs sm:max-w-sm">
                        <div className="flex justify-between font-display text-[10px] tracking-widest uppercase text-white/60 mb-2">
                            <span>EXP</span>
                            <span>4200 / 5000</span>
                        </div>
                        <div className="h-[6px] bg-white/10 border border-white/20 w-full">
                            <motion.div
                                className="h-full bg-[--color-vault-gold]"
                                initial={{ width: 0 }}
                                animate={{ width: '84%' }}
                                transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-3 lg:gap-4">
                        <button
                            className="px-6 lg:px-8 py-3 font-display font-black uppercase text-[10px] tracking-[0.2em] border-2 transition-all duration-200 w-full sm:w-auto"
                            style={{ background: 'var(--color-vault-gold)', color: '#070d0c', border: '2px solid var(--color-vault-gold)', boxShadow: '3px 3px 0px rgba(46,110,101,0.7)' }}
                            onMouseEnter={e => { e.currentTarget.style.boxShadow = '1px 1px 0px rgba(46,110,101,0.7)'; e.currentTarget.style.transform = 'translate(1px,1px)'; e.currentTarget.style.filter = 'brightness(1.08)'; }}
                            onMouseLeave={e => { e.currentTarget.style.boxShadow = '3px 3px 0px rgba(46,110,101,0.7)'; e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.filter = 'none'; }}
                        >
                            [ View Manifesto ]
                        </button>

                        <button
                            className="px-6 lg:px-8 py-3 font-display font-black uppercase text-xs tracking-[0.2em] transition-all duration-200 w-full sm:w-auto"
                            style={{ background: 'transparent', color: 'rgba(240,224,196,0.7)', border: '2px solid rgba(255,255,255,0.2)' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-vault-gold)'; e.currentTarget.style.color = 'var(--color-vault-gold)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(232,170,58,0.15)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(240,224,196,0.7)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            [ Secure Comm-Link ]
                        </button>
                    </motion.div>
                </motion.div>

                {/* ── RIGHT: SPECIAL Stat Cards ── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="hidden min-[769px]:flex flex-col gap-2 min-[769px]:gap-3 justify-center"
                >
                    <motion.div
                        variants={rightVariants}
                        className="flex items-center justify-between mb-1 lg:mb-2 border-b border-white/20 pb-3"
                    >
                        <span className="font-display text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-white uppercase">
                            S.P.E.C.I.A.L Stats
                        </span>
                        <span className="font-display text-[10px] sm:text-xs text-white">
                            DEV BUILD v1.0
                        </span>
                    </motion.div>

                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={rightVariants}
                            className="group relative border border-white/20 bg-black/50 backdrop-blur-sm p-3 lg:p-4 hover:border-[--color-vault-gold] transition-all duration-300 cursor-default overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[--color-vault-gold] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                            <div className="flex items-center gap-3 lg:gap-4">
                                <div className="w-11 h-11 lg:w-14 lg:h-14 flex-shrink-0 border-2 border-white flex items-center justify-center bg-black/60 group-hover:bg-transparent transition-colors duration-300">
                                    <span className="font-display font-black text-xs lg:text-sm text-white">
                                        {stat.label}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1 lg:mb-2">
                                        <span className="font-display text-[9px] lg:text-[10px] tracking-[0.2em] lg:tracking-[0.3em] uppercase text-white/50 group-hover:text-white/80 transition-colors">
                                            {stat.abbr}
                                        </span>
                                        <span className="font-display font-black text-base lg:text-xl text-white">
                                            {String(stat.value).padStart(2, '0')}
                                            <span className="text-white/30 text-xs font-normal">/10</span>
                                        </span>
                                    </div>
                                    <div className="flex gap-[2px] lg:gap-[3px] mb-1 lg:mb-2">
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className={`h-[5px] lg:h-[6px] flex-1 ${i < stat.value ? 'bg-[--color-vault-gold]' : 'bg-white/15'}`}
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ delay: 1.2 + index * 0.15 + i * 0.04, duration: 0.2 }}
                                                style={{ transformOrigin: 'left' }}
                                            />
                                        ))}
                                    </div>
                                    <p className="font-display text-[9px] lg:text-[10px] uppercase tracking-wider text-white/40 group-hover:text-white/70 transition-colors truncate">
                                        {stat.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div variants={rightVariants} className="flex justify-end mt-1 lg:mt-2">
                        <span className="font-display text-[10px] tracking-[0.3em] text-white uppercase">
                            Pip-Boy 3000 Mk IV
                        </span>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}