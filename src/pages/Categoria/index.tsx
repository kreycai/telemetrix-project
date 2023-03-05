import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './index.css'
import { FaChevronDown, FaPenSquare, FaTrashAlt } from 'react-icons/fa'
import api from '../../services/api';


interface mapProps {
    id: number,
    allowQuantityVariation: boolean;
    description: string;
    hasShipping: boolean;
    limitRequest: number;
    limitRequestsPerMonth: boolean;
    name: string;           
    validateClient: boolean;
    valueVariation: number;
    allowValueVariation: boolean;
}

function Categoria(){
    const [dataC, setDataC] = useState<any[]>([])
    const [haveData, setHaveData] = useState(true)
    const [itensPerPage, setItensPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(0)
    const [deleteOk, setDeleteOk] = useState(false)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    
    
    const pages = Math.ceil(dataC.length / itensPerPage)
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = dataC.slice(startIndex, endIndex)
    const searchLower = search.toLowerCase()
    const newCurrentItens = currentItens.filter((obj) => obj.name.toLowerCase().includes(searchLower))


 
    useEffect(()=>{
        setItensPerPage(6)  
        async function dadosProCat(){
            await api.get("ProductCategory")
            .then(({data})=>{
                setDataC(data)
                setDeleteOk(false)    
                if(data[0].id){
                    setHaveData(true)
                    setLoading(false)
                }
            }).catch((r)=>{
                setLoading(false)
                setHaveData(false)
            })
        }
        dadosProCat()
    },[deleteOk, haveData])



    const deleteData = async (idDel:number) => {
        await api.delete(`ProductCategory/${idDel}`)
        .then((r)=>{
            toast.success("Categoria deletada com sucesso!")
            setDeleteOk(true)
        }).catch((r)=>{
            toast.error(`Erro:${r.response.status} - Não foi possivel deletar...`)
        })

    }

    if(loading){
        return(
            <div className='bodyCat'>
                <div className='init'>
                    <h2>Carregando categorias...</h2>
                    <Link to={'/categoria/create'}>Nova Categoria</Link>
                </div>
            </div>
        )
    }
    if(!haveData){
        return(
            <div className='bodyCat'>
                <div className='init'>
                    <h2>Nenhuma categoria cadastrada!</h2>
                    <Link to={'/categoria/create'}>Nova Categoria</Link>
                </div>
            </div>
        )
    }

    return(
        <div className='mainCat'>
            <input type="text" className='search' placeholder='Pesquisar categoria' value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <div className='bodyCat'>
                <div className='init'>
                    <h2>Categorias</h2>
                    <Link to={'/categoria/create'}>Nova Categoria</Link>
                </div>
                <div className='divMapCat'>
                    {newCurrentItens.map((cat:mapProps) => {
                        return(
                            <div key={cat.id} className='cardCat'> 
                                <article className='cardArt'>
                                <Link className='prod' state={{catName:cat.name}} to={`/categoria/${cat.id}/produtos`}>
                                    <h3>{cat.name}<FaChevronDown className='ic2'/></h3>
                                    <p>{cat.description}</p>
                                    <div className='quebra'>
                                        <div className='quebra1'>
                                            <p>Limite de pedidos: </p>
                                            <p>Possui limite de pedidos por mês:</p>
                                            <p>Variação de valor: </p>
                                            <p>Permitida a variação de valor: </p>
                                            <p>Permitida quantidade de variação:  </p>
                                            <p>Taxa de entrega:  </p>
                                            <p>Validação de cliente:  </p>
                                        </div>
                                        <div className='quebra2'>
                                            <p>{cat.limitRequest}</p>
                                            <p>{cat.limitRequestsPerMonth ? "Sim" : "Não"}</p>
                                            <p>R${cat.valueVariation.toFixed(2)}</p>
                                            <p> {cat.allowValueVariation ? "Sim" : "Não"}</p> 
                                            <p>{cat.allowQuantityVariation ? "Sim" : "Não"}</p>
                                            <p>{cat.hasShipping ? "Sim" : "Não"}</p>
                                            <p>{cat.validateClient ? "Sim" : "Não"}</p>
                                        </div>
                                    </div>
                                </Link>
                                    <div className='divButOpc'>
                                        <Link to={`/categoria/update/${cat.id}`} state={{nameCategory : cat.name}}><FaPenSquare className='ic' />Editar</Link>
                                        <button onClick={()=>deleteData(cat.id)}><FaTrashAlt className='ic'/>Deletar</button>
                                    </div>
                                </article>
                            </div> 
                        )
                    })}
                </div>
                <div className='divButPage'>
                    {Array.from(Array(pages), (item, index):any =>{
                        return <button key={index} value={index} onClick={(e):any=>setCurrentPage(Number((e.target as HTMLInputElement).value))} >{index+1}</button>
                    })}
                </div>
            </div>
        </div>
    )

}

export default Categoria;
