// import React from 'react'
// import './Comment.css'
// import React, {useState, useRef, useEffect } from 'react';
// import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
// import axios from '../../api/axios';
// import TopBar from '../LayoutBar/TopBar';
// import { Navigate, useNavigate, useHistory } from 'react-router-dom';



// const Comment = () => {

//     const axiosPrivate = useAxiosPrivate()
//     const [comment, setComment] = useState("")

   
//   return (
//     <div class="container">
//     <div class="row">
//         <div class="col-md-8">
//             <div class="media g-mb-30 media-comment">
//                 <img class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Ima Description" />
//                 <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
//                   <div class="g-mb-15">
//                     <h5 class="h5 g-color-gray-dark-v1 mb-0">John Doe</h5>
//                     <span class="g-color-gray-dark-v4 g-font-size-12">5 days ago</span>
//                   </div>
            
//                   <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
//                     felis in faucibus ras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
            
//                   <ul class="list-inline d-sm-flex my-0">
//                     <li class="list-inline-item g-mr-20">
//                       <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
//                         <i class="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
//                         178
//                       </a>
//                     </li>
//                     <li class="list-inline-item g-mr-20">
//                       <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
//                         <i class="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
//                         34
//                       </a>
//                     </li>
//                     <li class="list-inline-item ml-auto">
//                       <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
//                         <i class="fa fa-reply g-pos-rel g-top-1 g-mr-3"></i>
//                         Reply
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//             </div>
//         </div>
    
//         <div class="col-md-8">
//             <div class="media g-mb-30 media-comment">
//                 <img class="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Ima Description" />
//                 <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
//                   <div class="g-mb-15">
//                     <h5 class="h5 g-color-gray-dark-v1 mb-0">John Doe</h5>
//                     <span class="g-color-gray-dark-v4 g-font-size-12">5 days ago</span>
//                   </div>
            
//                   <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
//                     felis in faucibus ras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
            
//                   <ul class="list-inline d-sm-flex my-0">
//                     <li class="list-inline-item g-mr-20">
//                       <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
//                         <i class="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
//                         178
//                       </a>
//                     </li>
//                     <li class="list-inline-item g-mr-20">
//                       <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
//                         <i class="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
//                         34
//                       </a>
//                     </li>
//                     <li class="list-inline-item ml-auto">
//                       <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!">
//                         <i class="fa fa-reply g-pos-rel g-top-1 g-mr-3"></i>
//                         Reply
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </div>
//   )
// }

// export default Comment