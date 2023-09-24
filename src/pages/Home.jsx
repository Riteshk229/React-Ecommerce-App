import { useEffect, useState } from "react";
import { getProducts } from "../assets/JS";
import { Product } from "../components";

const Home = () => {
    const [data, setData] = useState([]);
    console.log("data 7", data);
    
    useEffect(() => {
        const fetch = async () => {
            const res = await getProducts();
            console.log("res", res);
            setData(res);
        }
        fetch();
    }, []);
    return (
        <>
            <h1>Hello Home</h1>
            {data.map((item, index) => {
                return <Product
                    product={item}
                    />
            })}
        </>
    )
}

export default Home;