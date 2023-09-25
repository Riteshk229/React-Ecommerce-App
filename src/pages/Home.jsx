import { useEffect, useState } from "react";
import { getProducts } from "../assets/JS";
import { Loader, ProductListItem } from "../components";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select  from "@mui/material/Select";
import { MenuItem, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";


const Home = () => {
    const [sortBy, setSortBy] = useState('');
    const[optionValue, setOptionValue] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const Options = [
        "",
        "asc",
        "desc",
    ];
    console.log("data 7", data);

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setOptionValue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setSortBy(value);
      };
    
    useEffect(() => {
        setIsLoading(true);
        const fetch = async () => {
            const res = await getProducts(sortBy);
            console.log("res", res);
            setData(res);
            setIsLoading(false);
        }
        fetch();
    }, [sortBy]);

    if (isLoading) {
        return <Loader/>
    }
    return (
        <>
            <div className="selectSort">
                <FormControl sx={{
                    m: 1, width: 300,
                    textTransform: "capitalize",
                    textAlign: "left"
                }}>
                <InputLabel>Sort By</InputLabel>
                    <Select
                        value={optionValue}
                        onChange={handleChange}
                        input={<OutlinedInput label="Sort By"/>}
                    >
                    {Options.map((option,index) => (
                        <MenuItem
                            key={index}
                            value={option}
                            sx={{textTransform:"capitalize"}}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </div>

            <Grid
                container
                direction="row"
                spacing={1}
            >
            {data.map((item, index) => {
                return (
                    <Grid
                        item
                        zeroMinWidth
                        xl
                        key={index}
                    >
                        <Link
                            style={{
                                textDecoration: "none",
                                color: "inherit"
                            }}
                            to={`/product/${item.id}`}
                        >
                            <ProductListItem
                                product={item}
                            />                    
                        </Link>
                    </Grid>
                )
            })}
            </Grid>
        </>
    )
}

export default Home;