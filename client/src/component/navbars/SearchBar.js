import React from 'react'
import { useState } from 'react'
// import { Link } from 'react-router-dom'

export default function SearchBar() {
    
    const[posts, setPosts] = ([])
    const[search, setSearch] = useState('')
    const[searchResult, setSearchResult] = ([])
    
  return (
    <div>
        <nav className="Search">
             <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                 <label htmlFor='search'>Search Posts</label>
                 <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            {/* <ul>
                <li><Link to="/">Home</Link>
                </li>
            </ul> */}
        </nav>

    </div>
  )
}



// const Search1 = ({ search, setSearch}) => {
//     return (
//         <nav className="Search">
//             <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
//                 <label htmlFor='search'>Search Posts</label>
//                 <input
//                     id="search"
//                     type="text"
//                     placeholder="Search Posts"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//             </form>
//             {/* <ul>
//                 <li><Link to="/">Home</Link>
//                 </li>
//             </ul> */}
//         </nav>

//     )
// }

// export {Search}