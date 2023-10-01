import { useEffect, useState } from "react";
import { Loader, Products } from "../components";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select  from "@mui/material/Select";
import { IconButton, MenuItem, OutlinedInput } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {toast} from "react-toastify"

import { useSelector, useDispatch } from "react-redux";
import {
    resetState,
    sortByPrice,
} from "../features/productsSlice";
import { Scale } from "@mui/icons-material";

const Home = () => {
    const dispatch = useDispatch();
    const [optionValue, setOptionValue] = useState([]);
    const [xVisible, setXVisible] = useState("false");
    const isLoading = useSelector(state => state.products.loading);

    const Options = [
        "",
        "asc",
        "desc",
    ];

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        console.log(value);
        setOptionValue(value);
        if (value === 'asc' || value === "desc") {
            dispatch(sortByPrice(value));
            if (value == 'asc') {
                toast.success(`Sorted by Price : Low to High.`);
            } else {
                toast.success(`Sorted by Price : High to Low.`);
            }
            setXVisible(true);
        }
        else {
            dispatch(resetState());
            toast.success(`Order Back to default..!!`);
            setOptionValue("");
            setXVisible(false)
        }
      };
    

    if (isLoading) {
        return <Loader/>
    }
    return (
        <>
            <div className="selectSort">
                <FormControl sx={{
                    position :"relative",
                    m: 2, width: 300,
                    textTransform: "capitalize",
                    textAlign: "left"
                }}>
                    <InputLabel>Sort By</InputLabel>
                    <IconButton
                        sx={{
                            position: "absolute",
                            right: 2,
                            top: "-40px",
                            width : "50px",
                            height: "50px",
                            "&:hover": {
                                color: "black",
                                fontWeight: 600,
                                transform: 'scale(1.2)'
                            }
                        }}
                        onClick={() => {
                            dispatch(resetState());
                            toast.success(`Order Back to default..!!`);
                            setOptionValue("");
                            setXVisible(false);
                        }}
                        size="small"
                    >
                        <CloseOutlinedIcon  sx={{visibility: `${xVisible ? "visible" : "hidden"}`}}/>
                    </IconButton>
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
            <Products />
        </>
    )
}

export default Home;