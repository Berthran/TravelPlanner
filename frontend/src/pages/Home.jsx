import React, {
    useState,
    useEffect
} from 'react'
import Navbar from '../components/Navbar'
import RecCard from "../components/RecCard"
import Map, {
    Marker
} from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import "../styles/home.scss"
import {
    Link
} from 'react-router-dom';

const Home = () => {

    const [places, setPlaces] = useState([]);
    const [value, setValue] = useState("");
    const [viewState, setViewState] = React.useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 12
    });


    useEffect(() => {
        const getPlaces = async () => {
          const promise = await fetch(
            `https://maps.googleapis.com/maps/api/place/findplacefromtext/${value}.json?access_token=${process.env.MAP_API_KEY}`
          );
          const data = await promise.json();
          setPlaces(data.features);
          console.log(data);
        };

        if (value) {
          getPlaces();
        }
      }, [value]);


    const handleClick = (query) => {
        setValue(query.place_name)
        const { center } = query;
        setViewState((prevState) => ({
            ...prevState,
            latitude: center[1],
            longitude: center[0],
        }));
        setPlaces([])
    }

    const mockData = [
        {
            name: "New York",
            image: "https://media.geeksforgeeks.org/wp-content/uploads/20240321072009/landmark-statue-liberty-new-york-city-famous-landscape-buildings-statue-liberty-uas-tourist-attraction-design-postcard-travel-poster-vector-illustration_1150-56573-compressed.jpg"
        },
        {
            name: "Venice",
            image: "https://media.geeksforgeeks.org/wp-content/uploads/20240321072310/travel-around-world-colorful-poster_52683-28357.jpg"
        },
        {
            name: "Gangtok",
            image: "https://media.geeksforgeeks.org/wp-content/uploads/20240321072631/flat-ski-station_23-2148010938.jpg"
        },
        {
            name: "Cairo",
            image: "https://media.geeksforgeeks.org/wp-content/uploads/20240321072500/egyptian-night-desert-pyramids-sphinx-anubis_107791-1591.jpg"
        },
    ]

    return (
        <div className='home'>
            <Navbar />
            <div className="home-wrapper">
                <div className="map">
                    <div className="search">
                        <div className="search-bar">
                            <input placeholder='Search places' type="text"
                                name='place' id='place' value={value}
                                onChange={(e) => setValue(e.target.value)} />
                        </div>
                        <div className="searches">
                            {
                                places?.map((items, index) => {
                                    return (
                                        <div key={index} onClick={() => handleClick(items)}>
                                            <p>{items.place_name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Link to={`/destination/${value}`}>
                        <Map
                            {...viewState}
                            onMove={evt => setViewState(evt.viewState)}
                            style={{ width: 800, height: 400 }}
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        >
                            <Marker className="marker"
                                longitude={viewState.longitude}
                                latitude={viewState.latitude} color="red" />
                        </Map>
                    </Link>
                </div>
                <h1 className='head'>Recommendations for you</h1>
                <div className="recommendations">
                    {mockData.map((d, index) => (
                        <RecCard key={index} image={d.image} name={d.name} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
