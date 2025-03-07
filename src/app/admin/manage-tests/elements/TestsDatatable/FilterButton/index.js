import { useState } from "react";
import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

const FilterButton = ({ filtersCount, handleOpen, handleClear }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <IconButton
            onClick={handleOpen}
            size="small"
            className="bg-blue-500 hover:bg-blue-600 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <>
                <FilterListIcon style={{ color: "white", fontSize: "20px", marginRight: "5px" }} />
                <span className="text-sm">{filtersCount > 0 && filtersCount} Filter</span>
                {(filtersCount > 0) && <CloseIcon
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering handleOpen
                        handleClear();
                    }}
                    className=" right-0 bg-white text-black rounded-full p-0.5 ml-2"
                    fontSize="small"
                />}
            </>

        </IconButton>
    );
};

export default FilterButton;
