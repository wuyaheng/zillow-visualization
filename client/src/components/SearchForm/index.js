import React from "react";

function SearchForm({ handleSubmit }) {
    return (
        <form className="d-flex justify-content-center" onSubmit={handleSubmit}>
        <div className="form-row align-items-center">
            <div className="col-md-5">
            <input type="text" className="form-control mt-2" id="inlineFormInput" placeholder="Min Price" name="sel_min"/>
            </div>
            <div className="col-md-5">
                <input type="text" className="form-control mt-2" id="inlineFormInputGroup" placeholder="Max Price" name="sel_max"/>
            </div>
            <div className="col-md-2 center">
            <button type="submit" className="btn btn-block">DONE</button>  
            </div>
        </div>
        </form>
    )
}

export default SearchForm; 