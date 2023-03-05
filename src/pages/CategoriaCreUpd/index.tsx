import { FC, ChangeEvent, ChangeEventHandler, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './index.css'
import api from '../../services/api';
import Input from '../../components/Form/input';
import Select from '../../components/Form/select';
import Button from '../../components/Form/button';

interface propsInfo {
    info: string;
}

const CategoriaCreUpd:FC<propsInfo> = ({info}) => {
    const [values, setValues] = useState<any>({})
    const [okPost, setOkPost] = useState(false)

    const { id } = useParams();
    const location = useLocation()
    const { nameCategory } = location.state || ""
    const navigate = useNavigate()
    const arrayTF = ['allowQuantityVariation', 'hasShipping', 'limitRequestsPerMonth', 'validateClient', 'allowValueVariation']
    const optionsCategoryYesNo = [{id: 1, text: 'Sim', bool: true}, {id: 0, text: 'Não', bool: false}];


    
    useEffect(()=>{
        if (okPost) {
            const dadosCreUpd = async () => {
                setOkPost(false)
                if(info==="create"){
                    await api.post("ProductCategory", values)
                    .then(()=>{
                        navigate("/categorias");
                        toast.success("Categoria criada com sucesso!")
                    }).catch((r)=>{     
                        toast.error(`Erro:${r.response.status} - Revise os campos...`)
                    })
                }else if(info === "update"){
                    console.log("update " + values);
                    await api.put(`ProductCategory/${id}`, values)
                    .then(()=>{
                        navigate("/categorias");
                        toast.success("Categoria alterada com sucesso!")
                    }).catch((r)=>{
                        return(
                            toast.error(`Erro:${r.response.status} - Revise os campos...`)
                        )
                    })
                }
            }
            dadosCreUpd()
        }
    },[okPost, id, info, navigate, values])

    const handleChangeValues:ChangeEventHandler = (value: ChangeEvent<HTMLInputElement>)=>{
        setValues((PrevValue: any)=>({...PrevValue,[value.target.name]: value.target.value}))
    }

    const checkValue = async () =>{
        const valuesForCheck = Object.values(values)

        for (let i = 0; i < valuesForCheck.length; i++) {
            if (valuesForCheck[i] === ""){
                toast.warn(`Valor  "${valuesForCheck[i]}" não é valido`)
                return;
            }
            else if(valuesForCheck[i] === "Selecione uma opção"){        
                toast.warn(`Valor  "${valuesForCheck[i]}" não é valido`)
                return;
            }
        }
        if(valuesForCheck.length === 9){
            convertValues()
        }else{
            toast.warn(`Preencha todos os campos!`)
        }
    }

    const convertValues = async () =>{
        await arrayTF.forEach(async (element)  => {

            if (values[element] === "0"){
                setValues((PrevValue: any)=>({...PrevValue,[element]: false}))
            }
            else if(values[element] === "1"){        
                setValues((PrevValue: any)=>({...PrevValue,[element]: true}))
            }
        });
        setOkPost(true)
    }

    

    return(
        <div className='mainForm'>
            <h1 className='h1Form'>{info === "create" ? "Cadastro de Categoria" : `Editando Categoria:`}</h1>
            <h1 className='h1Form2'>{info === "update" && `${nameCategory}`}</h1>
            <div className='divForm'>
                <div className='form'>
                    <Input 
                    type='text'
                    textLabel='Nome'
                    name='name'
                    placeholder='Ex: Motor AP'
                    func={handleChangeValues}
                    />

                    <Input 
                    type='text'
                    textLabel='Descrição'
                    name='description'
                    placeholder='Ex: Peças para motor AP'
                    func={handleChangeValues}
                    />

                    <Input 
                    type='number'
                    textLabel='Limite de pedido'
                    name='limitRequest'
                    placeholder='Ex: 9999'
                    func={handleChangeValues}
                    />

                    <Select
                    textLabel='Limite de pedido por mês'
                    name='limitRequestsPerMonth'
                    id='limitRequestsPerMonth'
                    options={optionsCategoryYesNo}
                    func={handleChangeValues}
                    />

                    <Input 
                    type='number'
                    textLabel='Variação de valor'
                    name='valueVariation'
                    placeholder='Ex: 9999'
                    func={handleChangeValues}
                    />

                    <Select
                    textLabel='Permitir variação de valor'
                    name='allowValueVariation'
                    id='allowValueVariation'
                    options={optionsCategoryYesNo}
                    func={handleChangeValues}
                    />

                    <Select
                    textLabel='Permitir variação de quantidade'
                    name='allowQuantityVariation'
                    id='allowQuantityVariation'
                    options={optionsCategoryYesNo}
                    func={handleChangeValues}
                    />

                    <Select
                    textLabel='Possui frete'
                    name='hasShipping'
                    id='hasShipping'
                    options={optionsCategoryYesNo}
                    func={handleChangeValues}
                    />

                    <Select
                    textLabel='Cliente validado'
                    name='validateClient'
                    id='validateClient'
                    options={optionsCategoryYesNo}
                    func={handleChangeValues}
                    />

                    <Button text='Enviar' func={checkValue}/>

                </div>
            </div>

        </div>
    )
}
                    //272...33.66
export default CategoriaCreUpd;