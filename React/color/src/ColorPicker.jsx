import { useState } from 'react'

export default function ColorPicker(){
    const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
    const [focusedIndex, setFocusedIndex] = useState(null);

    const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
    ];

    function handleClick(color){
        setSelectedColor({name: color.name, hex: color.hex})
    }

    function handleMouseEnter(colorHex){
        setSelectedColor({name: null, hex: colorHex})
    }

    function handleMouseLeave(){
        setSelectedColor({ hex: null, name: null })
    }

    function handleFocus(index){
        setSelectedColor(colors[index]);
    }

    function handleBlur(){
        setSelectedColor({ hex: null, name: null })
    }

    function handleKeyDown(e, index){
        let nextIndex = focusedIndex;
        
        if (e.key === "ArrowRight") {
            nextIndex = (focusedIndex + 1) % colors.length;  
        } else if (e.key === "ArrowLeft") {
            nextIndex = (focusedIndex - 1 + colors.length) % colors.length;  
        }

        setFocusedIndex(nextIndex);
        setSelectedColor(colors[nextIndex]);
    }
    
    return (
        <div className="color-picker">
            <h1>Color Picker</h1>
            <div className="color-list">
                {colors.map((color, index) => (
                <div
                    key={index}
                    className={`color-item ${focusedIndex === index ? 'focused' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleClick(color)}
                    onMouseEnter={() => handleMouseEnter(color.hex)}
                    onMouseLeave={handleMouseLeave}
                    onFocus={() => handleFocus(index)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    tabIndex={0}
                >
                    {selectedColor.hex === color.hex && (
                    <span className="color-code">{selectedColor.name || color.hex}</span>
                    )}
                </div>
                ))}
            </div>
        </div>
    );
}