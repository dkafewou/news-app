import React from "react"
import { Fragment } from "redux-little-router"
import ArticlesPage from "../components/ArticlesPage"

export default class App extends React.Component {
  render() {
   return(
     <div>
       <Fragment forRoute="/">
         <div>
           <Fragment forRoute="/">
             <ArticlesPage/>
           </Fragment>

           <Fragment forNoMatch>
             <div>Page not found</div>
           </Fragment>
         </div>
       </Fragment>
     </div>
   )
  }
}
