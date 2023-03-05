import React, { FC, ChangeEvent, ChangeEventHandler, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './index.css'
import api from '../../services/api';
import Input from '../../components/Form/input';
import Select from '../../components/Form/select';
import Button from '../../components/Form/button';

// interface funcProp{
//     value: string | number
// }
// const handleChangeValues:ChangeEventHandler<funcProp> = (event) => { 
    //tb funfou
// }

interface propsInfo {
    info?: string;
}

const ProdutoCreUpd:FC<propsInfo> = ({info}) => {
    const [values, setValues] = useState<any>({})
    const [okPost, setOkPost] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate()
    const location = useLocation()
    const { idCategory } = location.state || 0
    const { nameProduct, catName, catNameRet } = location.state || ""
    const arrayTF = ['isAvailable', 'isWarehouse']
    const optionsProductYesNo = [{id: 1, text: 'Sim', bool: true}, {id: 0, text: 'Não', bool: false}];

    useEffect(()=>{
        if (okPost) {
            const dadosCreUpd = async () => {
                setOkPost(false)
                if(info==="create"){
                    await api.post("Product", values)
                    .then(()=>{
                        if (catNameRet) {
                            navigate(`/categoria/${idCategory}/produtos`,{state:{name: catNameRet}});
                            toast.success("Produto criado com sucesso!")
                        }else{
                        navigate(`/categoria/${idCategory}/produtos`,{state:{name: catName}});
                        toast.success("Produto criado com sucesso!")
                        }
                    }).catch((r)=>{     
                        toast.error(`Erro:${r.response.status} - Revise os campos...`)
                    })
                }else if(info === "update"){
                    await api.put(`Product/${id}`, values)
                    .then(()=>{
                        if (catNameRet) {
                            navigate(`/categoria/${idCategory}/produtos`,{state:{name: catNameRet}});
                        }else{
                            navigate(`/categoria/${idCategory}/produtos`,{state:{name: catName}});
                        }
                        toast.success("Produto alterado com sucesso!")
                    }).catch((r)=>{
                        return(
                            toast.error(`Erro:${r.response.status} - Revise os campos...`)
                        )
                    })
                }
            }
            dadosCreUpd()
        }
    },[okPost, catName, id, idCategory, info, navigate, values, catNameRet])

    const handleChangeValues:ChangeEventHandler = (value: ChangeEvent<HTMLInputElement>)=>{
        setValues((PrevValue: any)=>({...PrevValue,[value.target.name]: value.target.value, "categoryId": idCategory}))
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
        if(valuesForCheck.length === 8){
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
            <h1 className='h1Form'>{info === "create" ? `Cadastro de Produto da categoria` : `Editando produto`}</h1>
            {catNameRet ? 
                <h1 className='h1Form'>{info === "update" ?`${nameProduct}` : `${catNameRet}`}</h1>
            :
                <h1 className='h1Form'>{info === "update" ?`${nameProduct}` : `${catName}`}</h1>
            }

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
                    textLabel='Quantidade minima de compra'
                    name='minPuchaseQuantity'
                    placeholder='Ex: 9999'
                    func={handleChangeValues}
                    />

                    <Select
                    textLabel='Disponivel'
                    name='isAvailable'
                    id='isAvailable'
                    options={optionsProductYesNo}
                    func={handleChangeValues}
                    />

                    <Input 
                    type='number'
                    textLabel='ICMS'
                    name='icmsTax'
                    placeholder='Ex: 9999'
                    func={handleChangeValues}
                    />

                    <Input 
                    type='number'
                    textLabel='IPI'
                    name='ipiTax'
                    placeholder='Ex: 9999'
                    func={handleChangeValues}
                    />

                    <Select
                    textLabel='Em estoque'
                    name='isWarehouse'
                    id='isWarehouse'
                    options={optionsProductYesNo}
                    func={handleChangeValues}
                    />

                    <Button text='Enviar' func={checkValue}/>

                </div>
            </div>

        </div>
    )
}
export default ProdutoCreUpd;