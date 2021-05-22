import { Formik } from "formik"
import { useState } from "react"
import { Form, Button } from 'react-bootstrap'
import API from '../../lib/apis'
import constants from '../../lib/constants.json'
import { getAuthToken } from "./Auth";
// import UrlKeywordRow from './urlKeywordRow'

const getUrlsApi = constants.baseserver + constants.crawl
const sendKeywordsApi = constants.baseserver + constants.adminaddkeywords

export default function Parsing() {

    const [returnUrls, setReturnUrls] = useState([])
    const [keywords,setKeywords] = useState([])
    // var linkElem = ""
    // if (returnUrls !== "") {
    //     linkElem = returnUrls.map((item) => 
    //         <li>{item}</li>
    //     )
    // }
    const changeKeyword = (index,value)=>{
        keywords[index] = value;
        setKeywords(keywords)
    }

    const sendKeywords = async ()=>{
        let dataToSend = []
        let dataobj = {}
        console.log("Sending Keyword Data")
        console.log({keywords,returnUrls})
        returnUrls.map((el,index)=>{
            if(!keywords[index]) return
            dataobj[keywords[index]] = el
            // dataToSend.push({url:el,keywords:keywords[index]})
        })
        console.log("dataobj",dataobj)

        const response = await fetch("https://airbus-hackathon-backend.ganeshkumar269.repl.co/api/v1/admin/keywords",{
            "method":"POST",
            "headers":{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + "Sample_token"
            },
            "body":JSON.stringify({website_id:"12233",keywords:dataobj})
        })
        console.log(response)

    }

    // const getKeywordStuff = (keyword)=>keyword?.map((item)=>{
    //                 return <input placeholder={item}/>
    //             })
    // const getKeywordInputsForIndex = (index)=>{
    //     return getKeywordStuff(keywords[index])
    // }

    return (
        <>
        <h1>Index site for easy search!</h1>
        <Formik
            onSubmit={async (values) => {
                try {
                    console.log(values)
                    const token = getAuthToken('admin');
                    const crawlUrl = new URL(getUrlsApi)
                    crawlUrl.searchParams.append("url",values.callurl)
                    crawlUrl.searchParams.append("sameDomain","true")
                    const res = await fetch(crawlUrl.toString())
                    const resData = await res.json()
                    // const res = await API.get(constants.admingetkeywords, {
                    //     params: {
                    //         website_id: values.callurl,
                    //     },
                    //     headers: {
                    //         Authorization: `Bearer: ${token}`
                    //     }
                    // })
                    console.log(resData)
                    if (resData.status === 200) {
                        setKeywords(new Array(resData.urls.length))
                        setReturnUrls(resData.urls);    
                    }
                } catch (error) {
                    console.log("Error in calling api", error);
                }
            }}
            initialValues={{
                callurl: ""
            }}
        >
            {
                ({
                    handleSubmit,
                    handleChange,
                    values
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="validate1">
                            <Form.Label>Enter your domain Name</Form.Label>
                            <Form.Control type="text" name="callurl"
                                value={values.callurl} onChange={handleChange}
                            />
                        </Form.Group>
                        <Button type="submit">Get links</Button>
                    </Form>
                )
            }
        </Formik>
        <div>
            <br />
            <Button onClick={sendKeywords}>Send Keywords</Button>
            <div>
                {returnUrls?.map((item,index) => {
                //   return <UrlKeywordRow url={item} keywords={keywords[index]}/>;
                    if(index > 15) return(<></>)
                    return (
                        <>
                        <li>{item}</li>
                        {/* {getKeywordInputsForIndex(index)} */}
                        <input placeholder="Enter Keyword" onChange={(e)=>changeKeyword(index,e.target.value)}></input>    
                        {/* keywords[index]?.map(el =><input placeholder={el}/>) */}
                        </>
                    )
                })}
            </div>
            <br/>
            <div>
                {/* <button onClick={sendKeywords}>Send</button> */}
            </div> 
        </div>
        {/* {returnUrls ? returnUrls: "Empty Array"} */}
        </>
    )
}