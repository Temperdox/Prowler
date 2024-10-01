import { useState, useEffect } from 'react';
import './Crafting.css';
import itemsData from './Items.json'; // Import your JSON file
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Resource to sprite map
const resourceSpriteMap = {
    "Savia Plant Foliage": { x: 2, y: 0, location:"Stream" }, // Column 2, Row 0
    "Ironbush Sticks": { x: 3, y: 0, location:"Stream"  },    // Column 3, Row 0
    "Scaletree Bark Chunk": {x: 4, y: 0, location:"Stream" },
    "Fasteners":{x: 5, y: 0, location:"Stream" },
    "Aita Berry":{x: 6, y: 0, location:"Stream" },
    "Dull Stone Keepsake":{x: 7, y: 0},
    "Bone Fragments":{x: 8, y: 0, location:"Stream" },
    "Woven Plant Fibres":{x: 9, y: 0, location:"Stream" },
    "Bottle of Oil":{x: 10, y: 0},
    "Squared Stone Coins":{x: 11, y: 0},
    "Sanitised Cloth":{x: 12, y: 0},
    "Injector Vial":{x: 13, y: 0},
    "Moisture Vial":{x: 14, y: 0},
    "Water Filled Bucket":{x: 15, y: 0, location:"Stream" },
    /*----------------------------------*/
    "Scaletree Vine":{x: 1, y: 1, location:"Stream" },
    "Healing Patch":{x: 2, y: 1},
    "Accelerant":{x: 3, y: 1},
    "Broken Claw":{x: 4, y: 1, location:"Stream" },
    "Shiny Medallion":{x: 5, y: 1},
    "Stitched Sheet":{x: 6, y: 1},
    "Dyed Fabric Sheet":{x: 7, y: 1, location:"Savannah" },
    "Glistening Honey":{x: 8, y: 1, location:"Stream" },
    "Honey Roast Dusk-Shroom":{x: 9, y: 1, location:"Stream" },
    "Sweet n Sticky Rice Ball":{x: 10, y: 1},
    "Sweet Berry Syrup":{x: 11, y: 1},
    "Jelly Donut":{x: 12, y: 1},
    "Sulf Candy":{x: 13, y: 1},
    "Tar Plant Sap":{x: 14, y: 1, location:"Swamp" },
    /*----------------------------------*/
    "Unnatural Metal Scrap":{x: 3, y: 2},
    "Spine Growth Serum":{x: 4, y: 2},
    "Light Bowgun Frame":{x: 5, y: 2},
    "Rubbery Slab":{x: 6, y: 2, location:"Swamp" },
    "Resonance Crystal":{x: 7, y: 2, location:"Stream" },
    "Inert Metal Loop":{x: 8, y: 2, location:"Stream" },
    "Medicinal Herb Capsule":{x: 9, y: 2},
    /*----------------------------------*/
    "Scaletree Sapling":{x: 1, y: 3},
    /*----------------------------------*/
    "fish1":{x: 1, y: 4},
    "fish2":{x: 2, y: 4},
    "fish3":{x: 3, y: 4},
    /*----------------------------------*/
    "Poacher Tatters":{x: 0, y: 5, location:"Savannah" },
    "Hardened Clay Bricks":{x: 1, y: 5, location:"Stream" },
    "Shale Rice Grains":{x: 2, y: 5, location:"Stream" },
    "Flint Shards":{x: 3, y: 5, location:"Stream" },
    "Braided Rope Bundle":{x: 4, y: 5, location:"Stream" },
    "Wet Clay Clump":{x: 5, y: 5, location:"Stream" },
    "Mintea Herb":{x: 6, y: 5, location:"Stream" },
    "Dusk-Shroom":{x: 7, y: 5, location:"Stream" },
    "Sweet Berry Jam":{x: 8, y: 5},
    "Toast Dusk-Shroom":{x: 9, y: 5},
    "Rice Ball":{x: 10, y: 5},
    "Dusk-Shroomy Rice Ball":{x: 11, y: 5},
    "Refreshing Snuff":{x: 12, y: 5},
    "Refreshing Herb Paste":{x: 13, y: 5},
    "Gruelfish":{x: 14, y: 5},
    "Grilled Fish Darne":{x: 15, y: 5},
    /*----------------------------------*/
    "Porou Berry": {x: 0, y: 6, location:"Swamp" },
    "Sulf Sticks": {x: 1, y: 6},
    "Sulf Snaps": {x: 2, y: 6},
    "Serrated Blade Scrap": {x: 3, y: 6},
    "Ripened Porou Berry": {x: 4, y: 6, location:"Swamp" },
    "c5": {x: 5, y: 6},
    "c6": {x: 6, y: 6},
    "Clay Cup": {x: 7, y: 6},
    "Inert Metal Fragment": {x: 8, y: 6},
    "Stinger Chitin": {x: 9, y: 6, location:"Stream" },
    "Stinger Barb": {x: 10, y: 6, location:"Stream" },
    "Rubbery Strap": {x: 11, y: 6, location:"Stream" },
    "Rouser Petal": {x: 12, y: 6, location:"Stream" },
    "Fresa Berry": {x: 13, y: 6, location:"Stream" },
    "Sour Berry Jam": {x: 14, y: 6},
    "Sour Berry Syrup": {x: 15, y: 6},

    "Mundane Bait": {x: 0, y: 7},
    "Mini Bait": {x: 1, y: 7},
    "Medium Bait": {x: 2, y: 7},
    "Massive Bait": {x: 3, y: 7},
    "d4": {x: 4, y: 7},
    "Red Apula Fruit": {x: 5, y: 7, location:"Savannah" },
    "Candied Red Apula": {x: 6, y: 7},
    "Green Apula Fruit": {x: 7, y: 7},
    "Swamp Truffle": {x: 8, y: 7},
    "Roasted Swamp Truffle": {x: 9, y: 7},
    "Stewed Honey Truffles": {x: 10, y: 7},
    "Fishy Rice Ball": {x: 11, y: 7},
    "Fishy Stuffed Rice Ball": {x: 12, y: 7},
    "Fishy Wrapped Rice Ball": {x: 13, y: 7},
    "Mini Fish Fillet": {x: 14, y: 7},
    "Medium Fish Darne": {x: 15, y: 7},

    "Charred Fish Darne": {x: 0, y: 8},
    "Glazed Fish Darne": {x: 1, y: 8},
    "Massive Fish Steak": {x: 2, y: 8},
    "Charred Fish Steak": {x: 3, y: 8},
    "Glazed Fish Steak": {x: 4, y: 8},
    "Grazer Hock": {x: 5, y: 8, location:"Savannah"},
    "Hock Roast": {x: 6, y: 8},
    "Jammy Hock Roast": {x: 7, y: 8},
    "Grazer Chuck": {x: 8, y: 8},
    "Shoulder Steak": {x: 9, y: 8},
    "Marinated Shoulder Steak": {x: 10, y: 8},
    "Grazer Loin": {x: 11, y: 8},
    "Sirloin Fillet": {x: 12, y: 8},
    "Glazed Sirloin Fillet": {x: 13, y: 8},
    "Bulboin": {x: 14, y: 8},
    "Charred Bulboin": {x: 15, y: 8},

    "Spudd": {x: 0, y: 9},
    "Shedding Spudd": {x: 1, y: 9},
    "Ayota Gourd": {x: 2, y: 9, location:"Swamp"},
    "Ayota Roast": {x: 3, y: 9},
    "Raw Kernuts": {x: 4, y: 9},
    "Toasty Kernuts": {x: 5, y: 9},
    "Kernut Taffy": {x: 6, y: 9},
    "Sticky Seed Treat": {x: 7, y: 9},
    "Rousing Snuff": {x: 8, y: 9},
    "Rousing Paste": {x: 9, y: 9},
    "Rousing Perfume": {x: 10, y: 9},
    "Porou Soap": {x: 11, y: 9},
    "Flexwood Branches": {x: 12, y: 9, location:"Savannah"},
    "Raw Hide": {x: 13, y: 9, location:"Savannah"},
    "Stringy Sinew": {x: 14, y: 9, location:"Savannah"},
    "Monster Bone": {x: 15, y: 9, location:"Savannah" },

    "g0": {x: 0, y: 10},
    "g1": {x: 1, y: 10},
    "Lust Potion": {x: 2, y: 10},
    "Fortifying Elixir": {x: 3, y: 10},
    "g4": {x: 4, y: 10},
    "g5": {x: 5, y: 10},
    "Spitter Webbing": {x: 6, y: 10},
    "Charger Crest Plate": {x: 7, y: 10},
    "Reactive Stone Shard": {x: 8, y: 10},
    "Flint Slingshot Ammo": {x: 9, y: 10},
    "Porou Sponge": {x: 10, y: 10},
    "Felsite Shard": {x: 11, y: 10, location:"Savannah"},
    "g12": {x: 12, y: 10},
    "g13": {x: 13, y: 10},
    "g14": {x: 14, y: 10},
    "Shale Rice": {x: 15, y: 10},

    "h0": {x: 0, y: 11},
    "h1": {x: 1, y: 11},
    "h2": {x: 2, y: 11},
    "h3": {x: 3, y: 11},
    "h4": {x: 4, y: 11},
    "h5": {x: 5, y: 11},
    "h6": {x: 6, y: 11},
    "h7": {x: 7, y: 11},
    "h8": {x: 8, y: 11},
    "h9": {x: 9, y: 11},
    "h10": {x: 10, y: 11},
    "h11": {x: 11, y: 11},
    "h12": {x: 12, y: 11},
    "h13": {x: 13, y: 11},
    "h14": {x: 14, y: 11},
    "h15": {x: 15, y: 11},

    "i0": {x: 0, y: 12},
    "Jungle Mask": {x: 1, y: 12},
    "Jungle Vambrace": {x: 2, y: 12},
    "Hand-Woven Necklace": {x: 3, y: 12},
    "Scrappy Unders": {x: 4, y: 12},
    "Jungle Tassets": {x: 5, y: 12},
    "Jungle Chestguard": {x: 6, y: 12},
    "i7": {x: 7, y: 12},
    "i8": {x: 8, y: 12},
    "i9": {x: 9, y: 12},
    "i10": {x: 10, y: 12},
    "i11": {x: 11, y: 12},
    "i12": {x: 12, y: 12},
    "i13": {x: 13, y: 12},
    "i14": {x: 14, y: 12},
    "i15": {x: 15, y: 12},

    "j0": {x: 0, y: 13},
    "j1": {x: 1, y: 13},
    "j2": {x: 2, y: 13},
    "Scrappy Pouch": {x: 3, y: 13},
    "j4": {x: 4, y: 13},
    "j5": {x: 5, y: 13},
    "j6": {x: 6, y: 13},
    "Trapper's Amity": {x: 7, y: 13, location:"Swamp"}, /*Received after completing the snake quest in the swamp*/
    "Tapper's Key": {x: 8, y: 13, location:"Swamp"}, /*Same as above*/
    "j9": {x: 9, y: 13},
    "j10": {x: 10, y: 13},
    "j11": {x: 11, y: 13},
    "j12": {x: 12, y: 13},
    "j13": {x: 13, y: 13},
    "j14": {x: 14, y: 13},
    "j15": {x: 15, y: 13},

    "k0": {x: 0, y: 14},
    "Water Pouch": {x: 1, y: 14},
    "k2": {x: 2, y: 14},
    "Flimsy Pickaxe": {x: 3, y: 14},
    "k4": {x: 4, y: 14},
    "k5": {x: 5, y: 14},
    "Bone Arrows": {x: 6, y: 14},
    "k7": {x: 7, y: 14},
    "k8": {x: 8, y: 14},
    "k9": {x: 9, y: 14},
    "k10": {x: 10, y: 14},
    "k11": {x: 11, y: 14},
    "k12": {x: 12, y: 14},
    "k13": {x: 13, y: 14},
    "k14": {x: 14, y: 14},
    "k15": {x: 15, y: 14},

    "l0": {x: 0, y: 15},
    "l1": {x: 1, y: 15},
    "l2": {x: 2, y: 15},
    "l3": {x: 3, y: 15},
    "l4": {x: 4, y: 15},
    "l5": {x: 5, y: 15},
    "l6": {x: 6, y: 15},
    "l7": {x: 7, y: 15},
    "l8": {x: 8, y: 15},
    "l9": {x: 9, y: 15},
    "l10": {x: 10, y: 15},
    "l11": {x: 11, y: 15},
    "l12": {x: 12, y: 15},
    "l13": {x: 13, y: 15},
    "l14": {x: 14, y: 15},
    "l15": {x: 15, y: 15},

    "m0": {x: 0, y: 16},
    "m1": {x: 1, y: 16},
    "m2": {x: 2, y: 16},
    "m3": {x: 3, y: 16},
    "m4": {x: 4, y: 16},
    "m5": {x: 5, y: 16},
    "m6": {x: 6, y: 16},
    "m7": {x: 7, y: 16},
    "m8": {x: 8, y: 16},
    "m9": {x: 9, y: 16},
    "m10": {x: 10, y: 16},
    "m11": {x: 11, y: 16},
    "m12": {x: 12, y: 16},
    "m13": {x: 13, y: 16},
    "m14": {x: 14, y: 16},
    "m15": {x: 15, y: 16},

    "n0": {x: 0, y: 17},
    "n1": {x: 1, y: 17},
    "n2": {x: 2, y: 17},
    "n3": {x: 3, y: 17},
    "n4": {x: 4, y: 17},
    "n5": {x: 5, y: 17},
    "n6": {x: 6, y: 17},
    "n7": {x: 7, y: 17},
    "n8": {x: 8, y: 17},
    "n9": {x: 9, y: 17},
    "n10": {x: 10, y: 17},
    "n11": {x: 11, y: 17},
    "n12": {x: 12, y: 17},
    "n13": {x: 13, y: 17},
    "n14": {x: 14, y: 17},
    "n15": {x: 15, y: 17},

    "o0": {x: 0, y: 18},
    "o1": {x: 1, y: 18},
    "o2": {x: 2, y: 18},
    "o3": {x: 3, y: 18},
    "o4": {x: 4, y: 18},
    "o5": {x: 5, y: 18},
    "o6": {x: 6, y: 18},
    "o7": {x: 7, y: 18},
    "o8": {x: 8, y: 18},
    "o9": {x: 9, y: 18},
    "o10": {x: 10, y: 18},
    "o11": {x: 11, y: 18},
    "o12": {x: 12, y: 18},
    "o13": {x: 13, y: 18},
    "o14": {x: 14, y: 18},
    "o15": {x: 15, y: 18},

    "p0": {x: 0, y: 19},
    "p1": {x: 1, y: 19},
    "p2": {x: 2, y: 19},
    "p3": {x: 3, y: 19},
    "p4": {x: 4, y: 19},
    "p5": {x: 5, y: 19},
    "p6": {x: 6, y: 19},
    "p7": {x: 7, y: 19},
    "p8": {x: 8, y: 19},
    "p9": {x: 9, y: 19},
    "p10": {x: 10, y: 19},
    "p11": {x: 11, y: 19},
    "p12": {x: 12, y: 19},
    "p13": {x: 13, y: 19},
    "p14": {x: 14, y: 19},
    "p15": {x: 15, y: 19},


    // Add more resources here
};

const iconSrc = new URL('./assets/IconSet.gif', import.meta.url).href;
const Swamp = new URL('./assets/map-Swamp.png', import.meta.url).href;
const Savannah = new URL('./assets/map-Savannah.png', import.meta.url).href;
const Stream = new URL('./assets/map-Stream.png', import.meta.url).href;

const Crafting = ({ setView }) => {
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [filteredItems, setFilteredItems] = useState(Object.keys(itemsData)); // State for filtered items
    const [selectedItems, setSelectedItems] = useState([]); // For storing selected items
    const [expandedItems, setExpandedItems] = useState({});
    const [acquiredItems, setAcquiredItems] = useState({}); // State for tracking acquired items
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null); // Track hovered item for the modal

    // Function to load selected items from localStorage
    const loadSelectedItems = () => {
        const savedSelectedItems = localStorage.getItem('selectedItems');
        if (savedSelectedItems) {
            setSelectedItems(JSON.parse(savedSelectedItems));
        }
    };

    // Load selected items from localStorage when the component mounts
    useEffect(() => {
        loadSelectedItems(); // On mount, load the selected items from localStorage
    }, []);

    // Save selected items to localStorage whenever they change
    useEffect(() => {
        if (selectedItems.length > 0) {
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        } else {
            localStorage.removeItem('selectedItems');
        }
    }, [selectedItems]);

    // Filter the items whenever the search term changes
    useEffect(() => {
        const term = searchTerm.toLowerCase(); // Convert search term to lowercase
        const results = Object.keys(itemsData).filter(itemName =>
            itemName.toLowerCase().includes(term) // Case-insensitive search
        );
        setFilteredItems(results);
    }, [searchTerm]); // Run this effect whenever searchTerm changes

    const toggleExpand = (itemName) => {
        setExpandedItems((prev) => ({
            ...prev,
            [itemName]: !prev[itemName],
        }));
    };

    const handleItemSelect = (itemName) => {
        setSelectedItems((prevSelectedItems) => {
            const updatedItems = prevSelectedItems.includes(itemName)
                ? prevSelectedItems.filter((i) => i !== itemName) // Remove if already selected
                : [...prevSelectedItems, itemName]; // Add if not already selected

            return updatedItems;
        });
    };

    const handleAcquiredChange = (name, quantity, change) => {
        setAcquiredItems((prev) => {
            const newQuantity = Math.max(0, Math.min((prev[name] || 0) + change, quantity)); // Ensure it's between 0 and the quantity
            return { ...prev, [name]: newQuantity };
        });
    };

    const totalMaterials = selectedItems.reduce((acc, itemName) => {
        const item = itemsData[itemName];
        item.materials.forEach((material) => {
            acc[material.name] = (acc[material.name] || 0) + material.quantity;
        });
        return acc;
    }, {});

    const handleMouseEnter = (name) => {
        setHoveredItem(name); // Set the hovered item to trigger the modal
    };

    const handleMouseLeave = () => {
        setHoveredItem(null); // Remove the hovered item to hide the modal
    };

    const getMapImage = (location) => {
        switch (location) {
            case 'Swamp':
                return Swamp;
            case 'Savannah':
                return Savannah;
            case 'Stream':
                return Stream;
            default:
                return null; // In case the location doesn't match any of these
        }
    };

    return (
        <div className="crafting-page">
            <div className="header">
                <button onClick={() => setView('menu')} className="back-button">Back</button>
                <button onClick={() => setFilterModalVisible(true)} className="filter-button">Filter</button>

                {/* Search bar with live filtering */}
                <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        required
                    />
                </form>
            </div>

            <div className="content">
                <div className="left-pane">
                    <h3>Items</h3>
                    <div className="accordion">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((itemName) => (
                                <div key={itemName} className="item">
                                    <div className="item-wrapper">
                                        <div
                                            className="item-header"
                                            onClick={() => toggleExpand(itemName)}
                                        >
                                            <label className="checkbox-container">
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleItemSelect(itemName)}
                                                    checked={selectedItems.includes(itemName)} // Check if selected
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                            {itemName} <span className="expanded">{expandedItems[itemName] ? '-' : '+'}</span>
                                        </div>
                                        {expandedItems[itemName] && (
                                            <div className="item-details">
                                                <p>Category: {itemsData[itemName].category}</p>
                                                <p>Resources:</p>
                                                {itemsData[itemName].materials.map((material) => (
                                                    <p key={material.name}>
                                                        {material.quantity} x {material.name}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No matching items found</p>
                        )}
                    </div>
                </div>

                <div className="right-pane">
                    <div className="right-pane-bg"></div>
                    <h3>Total Costs</h3>
                    {Object.keys(totalMaterials).length > 0 ? (
                        <ul>
                            {Object.entries(totalMaterials).map(([name, quantity]) => {
                                const acquired = acquiredItems[name] || 0;
                                const isComplete = acquired === quantity;
                                return (
                                    <div
                                        key={name}
                                        className={`total-cost-wrapper ${isComplete ? 'complete' : ''}`}
                                    >
                                        <div className="total-cost-content">
                                            {/* Background Image for sprite using the map */}
                                            <div
                                                className="resource-image"
                                                style={{
                                                    backgroundImage: `url(${iconSrc})`,
                                                    backgroundPosition: `${-resourceSpriteMap[name]?.x * 32}px ${-resourceSpriteMap[name]?.y * 32}px`,
                                                    width: '32px',
                                                    height: '32px'
                                                }}
                                            />
                                            <li key={name}>
                                                <span className="cost"> {quantity}</span> x {name}
                                            </li>
                                        </div>
                                        <div className="total-cost-count-wrapper">
                                            {/* Map icon with hover event */}
                                            <div className="total-cost-location"
                                                 onMouseDown={() => handleMouseEnter(name)}
                                                 onMouseLeave={handleMouseLeave}>
                                                {/* Conditional rendering of the modal based on hover state */}
                                                {hoveredItem === name && (
                                                    <div className="modal.show map-modal">
                                                        <img
                                                            src={getMapImage(resourceSpriteMap[name]?.location)}
                                                            alt={`${name} map`}
                                                            className="map-image"
                                                        />
                                                    </div>
                                                )}
                                                <FontAwesomeIcon icon={faMapPin} size="2x" color="#21d321" />
                                            </div>
                                            <div
                                                className="square total-cost-add"
                                                onClick={() => handleAcquiredChange(name, quantity, 1)}
                                            >
                                                +
                                            </div>
                                            <div
                                                className="square total-cost-subtract"
                                                onClick={() => handleAcquiredChange(name, quantity, -1)}
                                            >
                                                -
                                            </div>
                                            <div className="square total-cost-acquired">
                                                {acquired}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No items selected.</p>
                    )}
                </div>
            </div>

            {filterModalVisible && (
                <div className="modal">
                    {/* Filter Modal content here */}
                </div>
            )}
        </div>
    );
};

export default Crafting;