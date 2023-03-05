import { useEffect } from 'react';
import logo from '../../imgs/logo.png'
import './index.css'

function Home(){
    useEffect(()=>{
        return ()=> {document.documentElement.style.overflow = 'scroll'}
    },[])

    document.documentElement.style.overflow = 'hidden';
    return(
        <div className='mainHome'>
            <div className="divCircle">
                <div className="circle"></div>
                <img className="imgCircle" src={logo} alt="default" />
            </div>
            <h2>CONECTIVIDADE. CONFIABILIDADE. INOVAÇÃO.</h2>
            <div className='descri'>
                <span>
                        A Telemetrix foi criada em 2009 para oferecer ao mercado de concessionárias de veículos automotores informação personalizada, 
                    trabalhada e pronta para ser utilizada nas tomadas de decisão.
                </span>
                <span>
                    Com sede em Curitiba e estrategicamente localizada, atendemos mais de 100 concessionárias de veículos em todo o território nacional
                    com soluções digitais direcionadas a gestão comercial, estratégica e contábil no setor de varejo automotivo.
                </span>
                <div className='var'>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.1045085185797!2d-49.27792808557662!3d-25.434769339308634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce47259071a03%3A0x6e9ab0b74627b431!2sRua%20Visconde%20de%20N%C3%A1car%2C%201505%20-%20cj%20701%20-%20Centro%2C%20Curitiba%20-%20PR%2C%2080410-201!5e0!3m2!1spt-BR!2sbr!4v1677632299574!5m2!1spt-BR!2sbr" 
                        width="350" 
                        height="200" 
                        style={{border: 0}} 
                        loading="lazy"
                        title='map'/>
                    <div className='ctt'>
                        <h3>Contato</h3>
                        <p>C7/C10/C28: 771155</p>
                        <p>BSIS: ACO7443</p>
                        <p>(831) 521-2360</p>
                        <p>info@telemetrix.com</p>   
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Home;