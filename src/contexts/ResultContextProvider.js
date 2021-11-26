import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseURL = `https://google-search3.p.rapidapi.com/api/v1`;

 export const ResultContextProvider = ({ children }) => {

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('messi');

    // results_type_url = /videos, /search, /images
    const getResults = async ( results_type_url ) => {
        setIsLoading(true);

        const response = await fetch(`${baseURL}${results_type_url}`, {
            method: 'GET',
            headers: {
                'x-user-agent': 'desktop',
                'x-proxy-location': 'US',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_API_KEY,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if(results_type_url.startsWith("/news")){
            setResults(data.entries);
        } else if(results_type_url.startsWith("/images")){
            setResults(data.image_results);
        } else {
            setResults(data.results);
        }
 
        setIsLoading(false);
    };

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            { children }
        </ResultContext.Provider>
    );

 }

export const useResultContext = () => useContext(ResultContext);

