import Logo from "../img/logo.jpeg"

const AboutUs = () => {
  return (
    <div>
        <div className="flex justify-center mt-20">

        <div className="flex items-center">
        <div className="w-[150px] mr-10">
            <img src={Logo} alt="Logo片" />
            </div>
            <div className="text-4xl text-[#aa8670] mr-20" style={{ fontFamily: "'DynaPuff', cursive" }}>Kagu Machi</div>
        </div>
        </div>
        <div className="flex mt-6 flex-col ">
            <div className="w-[30%] text-xl mx-auto my-4">企業理念</div>
            <div className="w-[30%] mx-auto">理念理念理念理念理念理念理念理念理念理念理念</div>
        </div>
    </div>
  )
}

export default AboutUs