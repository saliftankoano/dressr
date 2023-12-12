import { Button, Container, Form } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Modal } from 'react-bootstrap'
import './WardrbePage.css'
import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from "firebase/firestore";

function WardrbePage(){
    const [sampleText, setSampleText] = useState('SAMPLE TEXT GOES HERE');

    const [showItemEntry, setShowItemEntry] = useState(false);

    const [showTops, setShowTops] = useState('d-block');
    const [showBottoms, setShowBottoms] = useState('d-block');
    const [showHats, setShowHats] = useState('d-block');
    const [showAccessories, setShowAccessories] = useState('d-block');
    const [showOthers, setShowOthers] = useState('d-block');

    const[userId, setUserId]= useState("");

    const handleClose = () => setShowItemEntry(false);
    const handleOpen = () => setShowItemEntry(true);

    const clothes = ['tops', 'bottoms', 'hats', 'accessories', 'others']
    const sizes = ['xs','s','m','l','xl']
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'white', 'grey', 'tan']
    const seasons = ['winter', 'spring', 'summer', 'fall']

    const [topsData, setTopsData] = useState(null);

    useEffect(() => {
        // Get the Firebase authentication instance
        const auth = getAuth();
    
        // Listen for changes in the authentication state
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
          // Check if a user is currently logged in
          if (authUser) {
            // Access the UID of the currently logged-in user
            const { uid } = authUser;
            setUserId(uid);
          } else {
            setUserId(null);
          }

          fetchTops(userId).then(data => {
            if (data){
                setTopsData(data.items)
            }else{
                console.error('tops data null');
            }
          })
        });
    
        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
      }, []);

    async function fetchTops(UserId){
        try{
            const response = await axios.get('/api/fetchByType', {
                params: {
                userId: UserId,
                itemType: 'tops'
            }
            });
            setTopsData(response.data.items);
        } catch (error){
            console.error(error);
        }
    }

    const topsTab = () => {
        setSampleText("HERE ARE TOPS")
        setShowTops('d-block')
        setShowBottoms('d-none')
        setShowHats('d-none')
        setShowAccessories('d-none')
        setShowOthers('d-none')
        console.log(topsData);
        console.log(userId)
    };

    const bottoms = () => {
        setSampleText("HERE ARE BOTTOMS")
        setShowTops('d-none')
        setShowBottoms('d-block')
        setShowHats('d-none')
        setShowAccessories('d-none')
        setShowOthers('d-none')
    };

    const hats = () => {
        setSampleText("HERE ARE HATS")
        setShowTops('d-none')
        setShowBottoms('d-none')
        setShowHats('d-block')
        setShowAccessories('d-none')
        setShowOthers('d-none')
    };

    const accessories = () => {
        setSampleText("HERE ARE ACCESSORIES")
        setShowTops('d-none')
        setShowBottoms('d-none')
        setShowHats('d-none')
        setShowAccessories('d-block')
    };

    const others = () => {
        setSampleText("HERE ARE OTHERS")
        setSampleText("HERE ARE ACCESSORIES")
        setShowTops('d-none')
        setShowBottoms('d-none')
        setShowHats('d-none')
        setShowAccessories('d-none')
        setShowOthers('d-block')
    };
    
    return(
        <section className='wardrbePage'>
            <a href='./dashboard'><button id='outfit'>Home</button></a>
            <div className='nav-bar'>
                <div className='logo'>Dressr</div>
                <div className='clothing-categories'>
                    <Button variant='link' id="cat" onClick={topsTab}>tops</Button>
                    <Button variant='link' id="cat" onClick={bottoms}>bottoms</Button>
                    <Button variant='link' id="cat" onClick={hats}>hats</Button>
                    <Button variant='link' id="cat" onClick={accessories}>accessories</Button>
                    <Button variant='link' id="cat" onClick={others}>others</Button>
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
                <Row xs={4}>
                    {Array.from({length: 16}).map((tops) =>(
                    <Col className={showTops} key={tops} style={{paddingBottom:'20px'}}>
                        <Card>
                            <Card.Img src='https://m.media-amazon.com/images/I/A13usaonutL._AC_CLa%7C2140%2C2000%7C41wOgswhePL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UY580_.png'/>
                            <Card.Title>{top.name}</Card.Title>
                            <Card.Text>{top.size},{top.gender}, {top.color} {top.type}, best worn in {top.season}</Card.Text>
                        </Card>
                    </Col>
                    ))}
                </Row>

                <Row xs={4}>
                    {Array.from({length: 64}).map((bottoms) =>(
                    <Col className={showBottoms} key={bottoms} style={{paddingBottom:'20px'}}>
                        <Card>
                            <Card.Img src='https://cdn11.bigcommerce.com/s-axz3gp0dm3/images/stencil/640w/products/3041/20145/Mens-Burgundy-Pleated-Corduroy-Pants-MT08__10687.1679660824.jpg?c=1'/>
                            <Card.Title>BOTTOMS</Card.Title>
                            <Card.Text>burgundy corduory pants</Card.Text>
                        </Card>
                    </Col>
                    ))}
                </Row>

                <Row xs={4}>
                    {Array.from({length: 64}).map((hats) =>(
                    <Col className={showHats} key={hats} style={{paddingBottom:'20px'}}>
                        <Card>
                            <Card.Img src='https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/814DZwHk7iL._AC_SX385_.jpg'/>
                            <Card.Title>HATS</Card.Title>
                            <Card.Text>kirby hat</Card.Text>
                        </Card>
                    </Col>
                    ))}
                </Row>

                <Row xs={4}>
                    {Array.from({length: 64}).map((accessories) =>(
                    <Col className={showAccessories} key={accessories} style={{paddingBottom:'20px'}}>
                        <Card>
                            <Card.Img src='https://kaiworksnyc.com/cdn/shop/files/yugioha.png?v=1700611710&width=713'/>
                            <Card.Title>ACCESSORIES</Card.Title>
                            <Card.Text>millenium puzzle necklace</Card.Text>
                        </Card>
                    </Col>
                    ))}
                </Row>

                <Row xs={4}>
                    {Array.from({length: 64}).map((others) =>(
                    <Col className={showOthers} key={others} style={{paddingBottom:'20px'}}>
                        <Card>
                            <Card.Img src='https://i5.walmartimages.com/seo/Nickelodean-Nickelodeon-Little-Boys-TMNT-Umbrella-with-Character-Handle-Age-2-7_32fc3c8b-c84e-4e94-bc61-48bd2a6adb23_1.60a2b5d553d9b04a49aad055d1d68d87.jpeg'/>
                            <Card.Title>OTHERS</Card.Title>
                            <Card.Text>ninja turtle umbrella</Card.Text>
                        </Card>
                    </Col>
                    ))}
                </Row>
            </Container>

            <Modal show={showItemEntry} onHide={handleClose}>
                <Modal.Header closeButton>
                    <div style={{fontWeight:'Bold',fontSize:'25px'}}>Add Item</div>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Label><div style={{fontSize:'18.5px'}}>Clothing</div></Form.Label>
                        {clothes.map((clothing) => (
                            <div key='clothing'>
                                <Form.Check
                                    label={clothing}
                                    type='radio'
                                    name='clothing-label'
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
                                />
                            </div>
                        ))}
                    <br/>
                    <Form.Label><div style={{fontSize:'18.5px'}}>Colors</div></Form.Label>
                        {colors.map((color) => (
                            <div key='color'>
                                <Form.Check
                                    label={color}
                                    type='checkbox'
                                    name='color-label'
                                />
                            </div>
                        ))}
                    <br/>
                    <Form.Label><div style={{fontSize:'18.5px'}}>Season</div></Form.Label>
                        {seasons.map((season) => (
                            <div key='season'>
                                <Form.Check
                                    label={season}
                                    type='checkbox'
                                    name='season-label'
                                />
                            </div>
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button>Add Item</Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}

export default WardrbePage;