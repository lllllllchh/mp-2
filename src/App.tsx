import Cocktail from "./components/Cocktail.tsx"
import {useEffect,useState} from "react";
import {CocktailType} from "./interfaces/Types.ts";
import styled from "styled-components";

const ParentDiv = styled.div`
    background-color: darkgrey;
    border: 7px solid gray;
    display: flex;
    align-items: center;
    width: 80vw;
    height: 85vh;
    padding: 30px;
    margin: auto;
`;

export default function App(){
    const [data, setData] = useState<CocktailType[]>([]);

    useEffect(() => {
        async function fetchData(): Promise<void> {
            const rawData = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
            const {drinks}:{drinks: CocktailType[]} = await rawData.json();
            setData(drinks);
        }
        fetchData()
            .then(() => console.log("Data Fetched Successfully"))
            .catch((e: Error) => console.log("There was the error" + e));
    },[]);

    return(
        <ParentDiv>
            <Cocktail data={data}/>
        </ParentDiv>
    );
}
