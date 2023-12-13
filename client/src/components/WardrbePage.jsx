import { Button, Container, Form } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Modal } from 'react-bootstrap'
import './WardrbePage.css'
import { useState, useEffect } from 'react'
import auth from "../firebase.jsx";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import axios from 'axios';
import {app} from '../firebase';
import {Item} from './WardrobeBackend.js';

const db = getFirestore(app);
const colRef = collection(db, "users");    
getDocs(colRef).then((snapshot)=>{
        let users = [];
        snapshot.docs.forEach((doc)=>{
            users.push( {...doc.data().firstName, id: doc.id,})
        })
    }).catch(error=>{
        console.log(error.message)
    })

async function fetchTops(id){
    if(id === ""){
        return null
    }
    try{
        console.log('fetchTops: ', id)
        const response = await axios.get('http://localhost:4000/api/fetchByType', {
            params: {
                userId: id,
                itemType: 'tops'
            }
        });

        if (response){
            console.log(response.data.items)
            return response.data.items;
        }else{
            console.log('tops null');
        }
    } catch (error){
        console.error('tops null');
    }
}

async function fetchBottoms(id){
    if(id === ""){
        return null
    }
    try{
        console.log('fetchTops: ', id)
        const response = await axios.get('http://localhost:4000/api/fetchByType', {
            params: {
                userId: id,
                itemType: 'bottoms'
            }
        });

        if (response){
            console.log(response.data.items)
            return response.data.items;
        }else{
            console.log('bottoms null');
        }
    } catch (error){
        console.error('bottoms null');
    }
}

async function fetchHats(id){
    if(id === ""){
        return null
    }
    try{
        console.log('fetchHats: ', id)
        const response = await axios.get('http://localhost:4000/api/fetchByType', {
            params: {
                userId: id,
                itemType: 'hats'
            }
        });

        if (response){
            console.log(response.data.items)
            return response.data.items;
        }else{
            console.log('hats null');
        }
    } catch (error){
        console.error('hats null');
    }
}

async function fetchLayers(id){
    if(id === ""){
        return null
    }
    try{
        console.log('fetchLayers: ', id)
        const response = await axios.get('http://localhost:4000/api/fetchByType', {
            params: {
                userId: id,
                itemType: 'layers'
            }
        });

        if (response){
            console.log(response.data.items)
            return response.data.items;
        }else{
            console.log('layers null');
        }
    } catch (error){
        console.error('layers null');
    }
}

async function fetchFootwear(id){
    if(id === ""){
        return null
    }
    try{
        console.log('fetchFootwear: ', id)
        const response = await axios.get('http://localhost:4000/api/fetchByType', {
            params: {
                userId: id,
                itemType: 'footwear'
            }
        });

        if (response){
            console.log(response.data.items)
            return response.data.items;
        }else{
            console.log('footwear null');
        }
    } catch (error){
        console.error('footwear null');
    }
}

async function fetchAccessories(id){
    if(id === ""){
        return null
    }
    try{
        console.log('fetchAccessories: ', id)
        const response = await axios.get('http://localhost:4000/api/fetchByType', {
            params: {
                userId: id,
                itemType: 'accessories'
            }
        });

        if (response){
            console.log(response.data.items)
            return response.data.items;
        }else{
            console.log('accessories null');
        }
    } catch (error){
        console.error('accessories null');
    }
}

async function updateWardrobe(newItem, userId) {
	try {
		const response = await axios.post('http://localhost:4000/api/wardrobe/update', {
			newItem,
			userId
			}, {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.status === 200) {
		const data = response.data;
		if (data.success) {
			console.log('Wardrobe updated successfully');
		} else {
			console.error('Failed to update the wardrobe');
		}
		} else {
		console.error('Request failed with status:', response.status);
		}
	} catch (error) {
		console.error('Error updating the wardrobe:', error);
	}
}

function WardrbePage(){
    const [sampleText, setSampleText] = useState('');

    const [showItemEntry, setShowItemEntry] = useState(false);

    const [itemName, setItemName] = useState('');
	const [itemColor, setItemColor] = useState('');
	const [itemSize, setItemSize] = useState('');
	const [itemType, setItemType] = useState('');
	const [itemSeason, setItemSeason] = useState('');
	const [itemGender, setItemGender] = useState('');

    const [isLoadingTops, setIsLoadingTops] = useState(true);
    const [isLoadingBottoms, setIsLoadingBottoms] = useState(true);
    const [isLoadingHats, setIsLoadingHats] = useState(true);
    const [isLoadingLayers, setIsLoadingLayers] = useState(true);
    const [isLoadingAccessories, setIsLoadingAccessories] = useState(true);
    const [isLoadingFootwear, setIsLoadingFootwear] = useState(true);

    const [showTops, setShowTops] = useState('d-block');
    const [showBottoms, setShowBottoms] = useState('d-block');
    const [showHats, setShowHats] = useState('d-block');
    const [showAccessories, setShowAccessories] = useState('d-block');
    const [showLayers, setShowLayers] = useState('d-block');
    const [showFootwear, setShowFootwear] = useState('d-block');
    const [showOthers, setShowOthers] = useState('d-block');

    const handleClose = () => setShowItemEntry(false);
    const handleOpen = () => setShowItemEntry(true);

    const clothes = ['tops', 'bottoms', 'layers', 'footwear', 'hats', 'accessories']
    const sizes = ['xs','s','m','l','xl']
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'white', 'grey', 'tan']
    const seasons = ['winter', 'spring', 'summer', 'fall']
    const gender = ['male', 'female', 'unisex']

    const [wardrobeData, setWardrobeData] = useState(null);
    const [topsData, setTopsData] = useState(null);
    const [bottomsData, setBottomsData] = useState(null);
    const [hatsData, setHatsData] = useState(null);
    const [layersData, setLayersData] = useState(null);
    const [accessoriesData, setAccessoriesData] = useState(null);
    const [footwearData, setFootwearData] = useState(null);

    const [userId, setUserId] = useState('');

    useEffect(() => {
	const checkAuthState = () => {
		return new Promise((resolve, reject) => {
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				unsubscribe(); // Unsubscribe immediately after receiving the user data
				if (user) {
					resolve(user.uid); // Resolve the promise with user ID
				} else {
					reject('No user found'); // Reject the promise
				}
			});
		});
	};
	checkAuthState()
		.then(uid => {
			setUserId(uid); // Set the user ID when the user is found
		})
		.catch(error => {
			console.error(error);
		});
	}, []);

    useEffect(() => {
        if (userId) { // Checks if userId is not null or undefined
            fetchTops(userId).then(data => {
                console.log(userId, data);
                if (data) {
                    console.log(data);
                    setTopsData(data);
                    setIsLoadingTops(false);
                } else {
                    console.error('Error fetching tops');
                }
            });

            fetchBottoms(userId).then(data => {
                console.log(userId, data);
                if (data) {
                    console.log(data);
                    setBottomsData(data);
                    setIsLoadingBottoms(false);
                } else {
                    console.error('Error fetching bottoms');
                }
            });

            fetchHats(userId).then(data => {
                console.log(userId, data);
                if (data) {
                    console.log(data);
                    setHatsData(data);
                    setIsLoadingHats(false);
                } else {
                    console.error('Error fetching hats');
                }
            });

            fetchAccessories(userId).then(data => {
                console.log(userId, data);
                if (data) {
                    console.log(data);
                    setAccessoriesData(data);
                    setIsLoadingAccessories(false);
                } else {
                    console.error('Error fetching accessories');
                }
            });

            fetchLayers(userId).then(data => {
                console.log(userId, data);
                if (data) {
                    console.log(data);
                    setLayersData(data);
                    setIsLoadingLayers(false);
                } else {
                    console.error('Error fetching layers');
                }
            });

            fetchFootwear(userId).then(data => {
                console.log(userId, data);
                if (data) {
                    console.log(data);
                    setFootwearData(data);
                    setIsLoadingFootwear(false);
                } else {
                    console.error('Error fetching footwear');
                }
            });
        }
    }, [userId]); // Adds userId as a dependency

    const allTab = () => {
        setSampleText("")
        setShowTops('d-block')
        setShowBottoms('d-block')
        setShowHats('d-block')
        setShowAccessories('d-block')
        setShowLayers('d-block')
        setShowFootwear('d-block')
    }

    const topsTab = () => {
        setSampleText("HERE ARE TOPS")
        setShowTops('d-block')
        setShowBottoms('d-none')
        setShowHats('d-none')
        setShowAccessories('d-none')
        setShowLayers('d-none')
        setShowFootwear('d-none')
    };

    const bottoms = () => {
        setSampleText("HERE ARE BOTTOMS")
        setShowTops('d-none')
        setShowBottoms('d-block')
        setShowHats('d-none')
        setShowAccessories('d-none')
        setShowLayers('d-none')
        setShowFootwear('d-none')
    };

    const hats = () => {
        setSampleText("HERE ARE HATS")
        setShowTops('d-none')
        setShowBottoms('d-none')
        setShowHats('d-block')
        setShowAccessories('d-none')
        setShowLayers('d-none')
        setShowFootwear('d-none')
    };

    const layers = () => {
        setSampleText("HERE ARE LAYERS")
        setShowTops('d-none')
        setShowBottoms('d-none')
        setShowHats('d-none')
        setShowAccessories('d-none')
        setShowLayers('d-block')
        setShowFootwear('d-none')
    };

    const accessories = () => {
        setSampleText("HERE ARE ACCESSORIES")
        setShowTops('d-none')
        setShowBottoms('d-none')
        setShowHats('d-none')
        setShowAccessories('d-block')
        setShowLayers('d-none')
        setShowFootwear('d-none')
    };

    const footwears = () => {
        setSampleText("HERE ARE ACCESSORIES")
        setShowTops('d-none')
        setShowBottoms('d-none')
        setShowHats('d-none')
        setShowAccessories('d-none')
        setShowLayers('d-none')
        setShowFootwear('d-block')
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
    };

    const handleItemSubmit = (e) => {
        updateWardrobe(new Item(itemName, itemColor, itemSize, itemType, itemSeason, itemGender), userId)

        setShowItemEntry(false);
        window.location.reload();
    }

    
    
    return(
        <section className='wardrbePage'>
            <a href='./dashboard'><button id='outfit'>Home</button></a>
            <div className='nav-bar'>
                <div className='logo'>Dressr</div>
                <div className='clothing-categories'>
                    <Button variant='link' id="cat" onClick={allTab}>all</Button>
                    <Button variant='link' id="cat" onClick={topsTab}>tops</Button>
                    <Button variant='link' id="cat" onClick={bottoms}>bottoms</Button>
                    <Button variant='link' id="cat" onClick={layers}>layers</Button>
                    <Button variant='link' id="cat" onClick={footwears}>footwear</Button>
                    <Button variant='link' id="cat" onClick={hats}>hats</Button>
                    <Button variant='link' id="cat" onClick={accessories}>accessories</Button>
                </div>
                <Row id="search-bar">
                <Col>
                <Form>
                    <Form.Group>
                        <Form.Control placeholder='Search Here...'/>
                    </Form.Group>
                </Form>
                </Col>
                <Col>
                <Button onClick={handleOpen}>Add Item</Button>
                </Col>
                </Row>
            </div>

            <h1>{sampleText}</h1>
            <br/>  
            <Container id="clothes">
                {isLoadingTops ? (
                    <p>Loading Tops...</p>
                ) : topsData ? (
                <Row xs={4}>
                    {topsData.map((top) =>(
                    <Col className={showTops} key={top} style={{paddingBottom:'20px'}}>
                        <Card>
                            <Card.Img src='https://m.media-amazon.com/images/I/A13usaonutL._AC_CLa%7C2140%2C2000%7C41wOgswhePL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UY580_.png'/>
                            <Card.Title>{top.name}</Card.Title>
                            <Card.Text>{top.size},{top.gender}, {top.color} {top.type}, best worn in {top.season}</Card.Text>
                        </Card>
                    </Col>
                    ))}
                </Row>) : (
                    <p>Error loading tops</p>
                )}

                {isLoadingBottoms ? (
                    <p>Loading Bottoms...</p>
                ) : bottomsData ? (

                <Row xs={4}>
                    {bottomsData.map((bottom) =>(
                    <Col className={showBottoms} key={bottom} style={{paddingBottom:'20px'}}>
                        <Card>
                            <Card.Img src='https://ih1.redbubble.net/image.284637185.1821/leggings,l,x540,front-pad,600x600,f8f8f8.jpg'/>
                            <Card.Title>{bottom.name}</Card.Title>
                            <Card.Text>{bottom.size},{bottom.gender}, {bottom.color}, {bottom.type}, best worn in {bottom.season}</Card.Text>
                        </Card>
                    </Col>
                    ))}
                </Row>) : (
                    <p>Error loading bottoms...</p>
                )}

                {isLoadingLayers ? (
                    <p>Loading Layers...</p>
                ) : layersData ? (

                <Row xs={4}>
                    {layersData.map((layer) =>(
                    <Col className={showLayers} key={layer} style={{paddingBottom:'20px'}}>
                        <Card>
                            <Card.Img src='https://pbs.twimg.com/media/EkeX6Q1X0AAtZeU.jpg'/>
                            <Card.Title>{layer.name}</Card.Title>
                            <Card.Text>{layer.size}, {layer.gender}, {layer.color}, {layer.type}, best worn in {layer.season}</Card.Text>
                        </Card>
                    </Col>
                    ))}
                </Row>) : (
                    <p>Error loading layers...</p>
                )}

                {isLoadingFootwear ? (
                    <p>Loading Footwear...</p>
                ) : footwearData ? (

                <Row xs={4}>
                    {footwearData.map((footwear) =>(
                    <Col className={showFootwear} key={footwear} style={{paddingBottom:'20px'}}>
                        <Card>
                            <Card.Img src='https://slippezz.com/cdn/shop/files/Screenshot2023-08-09at9.50.34PM.png?v=1691632244'/>
                            <Card.Title>{footwear.name}</Card.Title>
                        <Card.Text>{footwear.size}, {footwear.gender}, {footwear.color}, {footwear.type}, best worn in {footwear.season}</Card.Text>
                        </Card>
                    </Col>
                    ))}
                </Row>) : (
                    <p>Your js are fake</p>
                )}

                {isLoadingHats ? (
                    <p>Loading Hats...</p>
                ) :hatsData ? (
                    <Row xs={4}>
                    {hatsData.map((hat) =>(
                    <Col className={showHats} key={hat} style={{paddingBottom:'20px'}}>
                        <Card>
                            <Card.Img src='https://images3.teeshirtpalace.com/images/productImages/question-mark-logo--black-ypwh-garment.webp?width=700'/>
                            <Card.Title>{hat.name}</Card.Title>
                            <Card.Text>{hat.size}, {hat.gender}, {hat.color}, {hat.type}, best worn in {hat.season}</Card.Text>
                        </Card>
                    </Col>
                    ))}
                </Row>
                ) : (
                    <p>Error loading hats</p>
                )}

                
                {isLoadingAccessories ? (
                    <p>Loading Accessories...</p>
                ) : accessoriesData ? (
                    <Row xs={4}>
                    {accessoriesData.map((accessory) =>(
                    <Col className={showAccessories} key={accessory} style={{paddingBottom:'20px'}}>
                        <Card>
                            <Card.Img src='https://i5.walmartimages.com/asr/7190f39d-0ab2-481d-85d5-ffc9d35088e6_1.9c384220d9a88882a7cf3ac7966f9571.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF'/>
                            <Card.Title>{accessory.name}</Card.Title>
                            <Card.Text>{accessory.size}, {accessory.gender}, {accessory.color}, {accessory.type}, best worn in {accessory.season}</Card.Text>
                        </Card>
                    </Col>
                    ))}
                </Row>
                ) : (
                    <p>Error loading accessories</p>
                )}
            </Container>

            <Modal show={showItemEntry} onHide={handleClose}>
                <Modal.Header closeButton>
                    <div style={{fontWeight:'Bold',fontSize:'25px'}}>Add Item</div>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                    <Form.Label><div style={{fontSize:'18.5px'}}>Name</div></Form.Label>
                    <Form.Control
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                    <br/>
                    <Form.Label><div style={{fontSize:'18.5px'}}>Clothing</div></Form.Label>
                        {clothes.map((clothing) => (
                            <div key='clothing'>
                                <Form.Check
                                    label={clothing}
                                    type='radio'
                                    name='clothing-label'
                                    value={clothing}
                                    onChange={(e) => setItemType(e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                    <br/>
                    <Form.Label><div style={{fontSize:'18.5px'}}>Size</div></Form.Label>
                        {sizes.map((size) => (
                            <div key='size'>
                                <Form.Check
                                    label={size}
                                    type='radio'
                                    name='size-label'
                                    value={size}
                                    onChange={(e) => setItemSize(e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                    <br/>
                    <Form.Label><div style={{fontSize:'18.5px'}}>Colors</div></Form.Label>
                        {colors.map((color) => (
                            <div key='color'>
                                <Form.Check
                                    label={color}
                                    type='radio'
                                    name='color-label'
                                    value={color}
                                    onChange = {(e) => setItemColor(e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                    <br/>
                    <Form.Label><div style={{fontSize:'18.5px'}}>Season</div></Form.Label>
                        {seasons.map((season) => (
                            <div key='season'>
                                <Form.Check
                                    label={season}
                                    type='radio'
                                    name='season-label'
                                    value={season}
                                    onChange={(e) => setItemSeason(e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                    <Form.Label><div style={{fontSize:'18.5px'}}>Gender</div></Form.Label>
                        {gender.map((gender) => (
                            <div key='gender'>
                                <Form.Check
                                    label={gender}
                                    type='radio'
                                    name='gender-label'
                                    value={gender}
                                    onChange={(e) => setItemGender(e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleItemSubmit}>Add Item</Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default WardrbePage;