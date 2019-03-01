import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import TrackingContainer from './TrackingContainer/TrackingContainer';
import Navigation from './Navigation/Navigation';
import TrendingContainer from './TrendingContainer/TrendingContainer';
import BillContainer from './BillContainer/BillContainer.js';
import LegislatorContainer from './LegislatorContainer/LegislatorContainer.js';
// import Login from './Login/Login.js';
import SearchBar from './SearchBar/SearchBar';
const tempData2 = require('./TempData/TempData');
const stringData = JSON.stringify(tempData2);
const parsedData = JSON.parse(stringData);
const tempDataMaster = require('./TempData/TempDataMaster');
const stringDataMaster = JSON.stringify(tempDataMaster);
const parsedDataMaster = JSON.parse(stringDataMaster);
const masterDatabase = parsedDataMaster.tempData;
// const statesApiKey = process.env.OPEN_STATES_API_KEY;
// const federalApiKey = process.env.PRO_PUBLICA_API_KEY;

// =================================
// CLEANING DATA FOR USE
// =================================
let cleanedData = [];
const data = masterDatabase.forEach((element) => {
  let summary = "";
  if (element.node.abstracts[0]) {
    summary = element.node.abstracts[0].abstract;
  }
  let cleanedObj = {
    title: element.node.title,
    summary: summary,
    state: element.node.legislativeSession.jurisdiction.name,
    proposed: element.node.createdAt.slice(0,-13),
    lastAction: element.node.updatedAt.slice(0,-13),
    trackingCount: 0,
  }
  cleanedData.push(cleanedObj);
})
console.log(`OUR DATA FORMAT EXAMPLE: ${JSON.stringify(cleanedData[0])}`);

// =================================
// ERROR 404
// =================================
const My404 = () => {
  return (
    <div>
      You are lost!!!
    </div>
  )
}

class App extends Component {
  constructor(){
    super();

    this.state = {
      dropdownOpen: false,
      logged: false,
      failedLogin: false,
      failedRegister: false,
      _id: null,
      userState: "CO",
      activePage: 'tracking',
      query: '',
      queryBtn: 0,
      bills: [],
      trackedBills: [],
      trackedReps: [],
      // trendingBills: parsedData.tempData,
      trendingBills: [],
      reps: parsedData.tempDataReps
      }
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }
// =====================================
// PULL MOST TRACKED BILLS FROM DATABASE
// =====================================
  getTrendingBills = async () => {
    try {
      const topBills = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/trending`, {
            method: 'GET',
            // body: JSON.stringify(this.state),
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        if(!topBills.ok){
            throw Error(topBills.statusText)
        }
        const parsedTopBills = await topBills.json();
        // ===================================
        // UPDATE STATE WITH TRENDING BILLS
        // ===================================
        this.updateTrending(parsedTopBills.data);
        console.log(`Trending bills response from Express API:${parsedTopBills.data}`)
    } catch(err){
        console.log(err)
    }
  }
// ================================================================================================================
//                             PULL INITIAL DATA FOR TRENDING AND BILL PAGES
// ================================================================================================================  
  componentDidMount() {
    // this.getTrendingBills();
    // this.getBillsFromQuery();
  }
// ================================================================================================================
//                                  CHANGE QUERY STATE WHEN USER TYPES
// ================================================================================================================ 
  handleInput = (e) => {
    this.setState({
      query: e.target.value
    }, function(){
      console.log(`SEARCHBAR SHOWS: ${this.state.query}`)
    });
  }
// ================================================================================================================
//                               CHANGE QUERY BUTTON STATE WHEN USER CLICKS
// ================================================================================================================ 
  onRadioBtnClick = (btn) => {
    this.setState({ 
      queryBtn: btn
    }, function() {
      console.log(`Radio Button should now be: ${this.state.queryBtn}`);
    });
  }
// ================================================================================================================
//                                CHANGE ACTIVE PAGE WHEN USER NAVIGATES
// ================================================================================================================ 
  updateNav = (page) => {
    this.setState({ 
      activePage: page
    }, function() {
      if (page === "trending"){
        this.getTrendingBills();
      }
    });
  }
// ================================================================================================================
//                                  UPDATE STATE WITH SUCCESSFUL LOGIN
// ================================================================================================================ 
  loginSuccess = (userId, trackedBills) => {
    let tracked = [];
    if (trackedBills) {
      tracked = trackedBills
    }
    this.setState({
      logged: true,
      failedEntry: false,
      _id: userId,
      trackedBills: tracked
    }, function() {
      console.log(`LOGGED IN. LOGGED: ${this.state.logged}, ID: ${this.state._id}, BILLS: ${this.state.trackedBills}`);
    });
  }
// ================================================================================================================
//                          ADD TO USER'S TRACKING LIST (MONGO AND REACT STATE)
// ================================================================================================================
  addBillToTracking = async (billToTrack) => {
    console.log('bill tracking function');
    console.log(billToTrack);
    try {
      if (billToTrack.id) {
        console.log('got to line 172')
// ================================================
// MONGO: ADD TO USER'S TRACKED BILLS (IF POSSIBLE)
// ================================================
        const isUserTracking = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/auth/track/${billToTrack.id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
          'Content-Type': 'application/json'
        }});
        console.log(isUserTracking, '~~~~~');
        if(!isUserTracking.ok){
          console.log('got to line 182')
          throw Error(isUserTracking.statusText)
        }
        const parsedIsUserTracking = await isUserTracking.json();
        console.log(parsedIsUserTracking, '===+++===');
        
// ==========================================
// UPDATE COUNT IN MONGO IF USER JUST TRACKED
// ==========================================
        if (parsedIsUserTracking) {
          // const updateBill = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/trending/track/${billToTrack._id}`, {
          // method: 'PUT',
          // body: JSON.stringify({
          //   increment: 1,
          // }),
          // credentials: 'include',
          // headers: {
          // 'Content-Type': 'application/json'
          // }
          // });
          // console.log('got to line 200')
          // if(!updateBill.ok){
          //     throw Error(updateBill.statusText)
          // }
          // const parsedUpdateBill = await updateBill.json();
          // console.log(`INCREMENTED BILL ID ${JSON.stringify(parsedUpdateBill.data._id)}`)
// ================================================
// ADD TO TRACKEDBILLS IN REACT (BASED ON DB REPLY)
// ================================================
          let updatedArray = [...this.state.bills];
          for(let i = 0; i < updatedArray.length; i++) {
            if(updatedArray[i]._id == billToTrack._id) {
              updatedArray[i].trackingCount ++
            }
          }
          console.log('got to line 215')
          this.setState({ 
            trackedBills: [...this.state.trackedBills, parsedIsUserTracking/*, parsedUpdateBill.data*/],
            bills: updatedArray
          }, function() {
            // console.log(`TRACKING BILL ${this.state.trackedBills[this.state.trackedBills.length-1]._id}`);
            this.getTrendingBills();
          });
          console.log(this.state);
        } else {
          console.log(`ALREADY TRACKING BILL ${billToTrack._id}`)
        }
      } 
// ================================================================
// IF NO ID, CREATE ONE IN MONGO (WE KNOW USER HASN'T TRACKED THEN)
// ================================================================
      else {
        console.log('got to line 231')
        const createBill = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/trending/`, {
        method: 'POST',
        body: JSON.stringify({
          title: billToTrack.title,   
          state: billToTrack.state,   
          summary: billToTrack.summary,
          proposed: billToTrack.created_at,
          lastAction: billToTrack.updated_at,
        }),
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json'
        }
        });
        if(!createBill.ok){
            throw Error(createBill.statusText)
        }
        const parsedCreateBill = await createBill.json();
        console.log(`DB CREATED BILL:${JSON.stringify(parsedCreateBill)}`)
// ==================================
// MONGO: ADD TO USER'S TRACKED BILLS
// ==================================
        const trackBill = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/auth/${this.state._id}/track/${parsedCreateBill.data._id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
          'Content-Type': 'application/json'
        }});
        if(!trackBill.ok){
            throw Error(trackBill.statusText)
        }
        const parsedTrackBill = await trackBill.json();
        console.log(`Updated bill response from Express API:${JSON.stringify(parsedTrackBill)}`)
// ========================================
// TRACK BILL IN STATE & UPDATE BILLS ARRAY
// ========================================
        let updatedArray = [...this.state.bills];
        for(let i = 0; i < updatedArray.length; i++) {
          if(updatedArray[i].title == parsedCreateBill.data.title) {
            updatedArray[i]._id = parsedCreateBill.data._id
            updatedArray[i].trackingCount = parsedCreateBill.data.trackingCount
          }
        }
        this.setState({ 
          trackedBills: [...this.state.trackedBills, parsedCreateBill.data],
          bills: updatedArray
        }, function() {
          console.log(`TRACKING BILL ID ${this.state.trackedBills[this.state.trackedBills.length-1]._id}`);
          this.getTrendingBills();
        });
      }
    } catch(err){
      console.log(err)
    }
  }
// ==================================================================
// UNTRACK BILL
// ==================================================================
  untrackBill = async (billId) => {
    console.log('@@@@@@@@ untrackBill from app.js');
    try {
      console.log(billId);
      console.log(billId.id);
// ==================================================================
// DECREMENT IN MONGO DATABASE
// ==================================================================
      // const updateBill = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/trending/untrack/${billId}`, {
      //   method: 'PUT',
      //   body: JSON.stringify({
      //       increment: -1,
      //   }),
      //   credentials: 'include',
      //   headers: {
      //   'Content-Type': 'application/json'
      //   }
      // });
      // if(!updateBill.ok){
      //   throw Error(updateBill.statusText)
      // }
      // const parsedUpdateBill = await updateBill.json();
      // console.log(`Updated bill response from Express API:${parsedUpdateBill}`)
// ==================================================================
// REMOVE FROM USER'S TRACKED BILLS
// ==================================================================
      const userUntrackBill = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/auth/untrack/${billId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json'
        }
      });
      if(!userUntrackBill.ok){
        throw Error(userUntrackBill.statusText)
      }
      console.log(userUntrackBill, 'userUntrackBill');
      const parsedUntrackBill = await userUntrackBill.json();
      console.log(parsedUntrackBill, 'parsedUntrackBill');
// ==================================================================
// REMOVE FROM TRACKEDBILLS IN REACT, IF SUCCESSFUL MONGO DELETION
// ==================================================================
      if (userUntrackBill.ok) {
        let billIds = [];
        for (let i=0; i<this.state.trackedBills; i++){
          billIds.push(this.state.trackedBills[i].id)
        }
        console.log(`TRACKED BILLS: ${JSON.stringify(billIds)}`)

        let arr = [];
        this.state.trackedBills.forEach((bill) => {
          if (bill.id !== billId){
            arr.push(bill);
          }
        })

        let updatedArray = [...this.state.bills];
        for(let i = 0; i < updatedArray.length; i++) {
          if(updatedArray[i]._id == billId && updatedArray[i].trackingCount) {
            updatedArray[i].trackingCount --
          }
        }

        this.setState({
          trackedBills: arr,
          bills: updatedArray
        }, function() {
          let billIds = [];
          for (let i=0; i<this.state.trackedBills; i++){
            billIds.push(this.state.trackedBills[i].id)
          }
          console.log(`UNTRACKED BILL ${billId} TRACKED BILLS: ${billIds}.`);
          this.getTrendingBills();
      });
      }
    } catch (err) {
      console.log(err);
    }
  }
  updateTrending = (data) => {
    console.log(`We are about to update Trending Bills with: ${data}`);
    this.setState({
      trendingBills: data
    }, function() {
      console.log(`Our new state is: ${this.state.trendingBills}`)
    });
  }
  handleRegister = async (e) => {
    e.preventDefault();
    try {
        const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                trackedBills: [],
                trackedReps: []
            }),
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        if(!loginResponse.ok){
            throw Error(loginResponse.statusText)
        }
        const parsedResponse = await loginResponse.json();
        console.log('UNFILTERED RESPONSE FROM EXPRESS', loginResponse);
        console.log('JSON RESPONSE FROM EXPRESS', parsedResponse);
        const jsonString = parsedResponse.data;
        const id = JSON.parse(jsonString).userId;
        const tracked = JSON.parse(jsonString).trackedBills;
        console.log('THIS IS THE ID', id);
        if (parsedResponse.status === 200){
          this.loginSuccess(id, tracked);
        } else {
          this.setState({
            failedRegister: true
          });
        }
    } catch(err){
        console.log(err)
    }
  }
  handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                // trackedBills: [],
                // trackedReps: []
            }),
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        console.log(loginResponse);
        if(!loginResponse.ok){
            console.log(`=== loginresponse ${loginResponse}`)
            throw Error(loginResponse.statusText)
        }
        const parsedResponse = await loginResponse.json();
        console.log('UNFILTERED RESPONSE FROM Backend', loginResponse);
        console.log('JSON RESPONSE FROM Backend', parsedResponse);
        // const jsonString = parsedResponse;
        const id = parsedResponse.id
        const tracked = parsedResponse.tracked_bills;
        console.log('THIS IS THE ID', id);
        if (parsedResponse){
          this.loginSuccess(id, tracked);
        } else {
          this.setState({
            failedLogin: true
          })
        }
    } catch(err){
        console.log(err)
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // getBillsFromApi = async () => {
  //   try {

  //     const cors_api_host = 'cors-anywhere.herokuapp.com';
  //     const cors_api_url = 'https://' + cors_api_host + '/';
  //     //const query = "{bills%28jurisdiction:%22Colorado%22,first:10%29{edges{node{title,subject,legislativeSession{jurisdiction{name}},createdAt,updatedAt,abstracts{abstract}}}}}";
  //     //const queryTest = "%7Bbills(jurisdiction%3A%20%22Colorado%22%2C%20first%3A%2010)%7Bedges%7Bnode%7Btitle%2Csubject%2ClegislativeSession%7Bjurisdiction%7Bname%7D%7D%2CcreatedAt%2CupdatedAt%2Cabstracts%7Babstract%7D%7D%7D%7D%7D&operationName=null";
  //     //const queryTest2 = {bills(jurisdiction:"Colorado",first:10){edges{node{title,subject,legislativeSession{jurisdiction{name}},createdAt,updatedAt,abstracts{abstract}}}}};
  //     const response = await fetch(`${cors_api_url}https://openstates.org/api/v1/bills/apikey=70a944df-df9d-48e6-b38a-29b09cd7c3db?state=co&per_page=10`, {
  //       method: 'POST',
  //       headers: {
  //         'content-type': 'application/json',
  //       },
  //     });

  //     if(!response.ok){
  //       throw Error(response.statusText);
  //     }

  //     const billsParsed = await response.json();

  //     this.setState({
  //       bills: billsParsed
  //     });

  //   } catch(err){
  //     console.log(err);
  //     return err
  //   }
  // }

// ====================================================================================================================
// THIS SHOULD QUERY THE API WITH USER INPUT
// ====================================================================================================================
getBillsFromQuery = async (e) => {
  e.preventDefault();

  const query = this.state.query;
  let state = "";
  switch (this.state.userState) {
    case "ALL":
      state = "All";
      break;
    case "CO":
      state = "Colorado";
      break;
    case "CA":
      state = "California";
      break;
    default:
      state = "";
      break;
  }

  function checkQueryAndState(item) {
    if (state && state != "All") {
      return (item.state == state && ( item.summary.includes(query) || item.title.includes(query) ));
    } else {
      return ( item.summary.includes(query) || item.title.includes(query) );
    }
  }

  // let returnedBills = cleanedData.filter(checkQueryAndState)
  // let billTitleList = [];
  // let limit = 0;
  // if (returnedBills.length > 10) {
  //   limit = 10;
  // } else {
  //   limit = returnedBills.length;
  // }
  // for (let i=0; i<limit;i++){
  //   billTitleList.push(returnedBills[i].title.slice(0,5) + "...")
  // }
  // console.log(`FIRST 10 BILLS FROM API QUERY: ${JSON.stringify(billTitleList)}`);
// ===========================================================
// LOOK FOR API BILLS IN MONGO TO PULL TRACKING INFO IF NEEDED
// ===========================================================
  // for (let i=0; i<limit-1; i++) {

      try {
        const findBill = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/bills/findBill`, {
            method: 'GET',
            body: JSON.stringify(),
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        console.log(findBill, 'findBill');

        if(!findBill.ok){
            throw Error(findBill.statusText)
        }

        const parsedResponse = await findBill.json();
        console.log(parsedResponse, 'parsedResponse');
        this.setState({
          bills: parsedResponse
        })
        // if (parsedResponse.status == 200) {
        //   returnedBills[i] = parsedResponse.data;
        // }

      } catch(err){
        console.log(err)
      }
  // }
  
  // let billTitles = [];
  // for (let i=0; i<limit;i++){
  //   billTitles.push(returnedBills[i].title.slice(0,5) + "...");
  // }
  // console.log(`BILLS FROM QUERY: ${JSON.stringify(billTitles)}`);
// ====================
// NOW UPDATE THE STATE
// ====================
  // this.setState({
  //   bills: returnedBills.slice(0,limit)
  // }, function() {
  //   let billTitles=[];
  //   for (let i=0;i<limit;i++){
  //     billTitles.push(returnedBills[i].title.slice(0,5) + "...")
  //   }
  //   console.log(`BILLS IN STATE W/ TRACKING COUNTS: ${billTitles}`)
  // })
}
// =============================================================================================================
//                                  UPDATE WHEN USER SELECTS A STATE TO QUERY
// =============================================================================================================
changeState = (e) => {
  this.setState({
    userState: e.target.name
  }, function(){
    console.log(`USER'S STATE IS NOW: ${this.state.userState}`)
  });
}
// ===========================================================
// CHECK DATABASE FOR PARTICULAR TITLE
// ===========================================================
// findBillAndReturnInfo = async (billTitle) => {
//   try {
//     const findBill = await fetch('http://localhost:9000/bills/findBill', {
//         method: 'POST',
//         body: JSON.stringify({
//             title: billTitle,
//         }),
//         credentials: 'include',
//         headers: {
//         'Content-Type': 'application/json'
//         }
//     },function(){
//       return findBill.json().data
//     });
//     if(!findBill.ok){
//         throw Error(findBill.statusText)
//     }
//     const parsedResponse = await findBill.json();
//     console.log('FOUND BILL FROM EXPRESS TO GRAB INFO FOR:', parsedResponse);
//     return parsedResponse.data;
//   } catch(err){
//       console.log(err)
//   }
// }
  render() {
    return (
      <div id="container">

        {/* NAVIGATION */}
        <Navigation updateNav={this.updateNav}/> <br/>

        <Container>
        {/* SEARCH BAR - DEFAULT 1ST BUTTON */}
        <Row className="justify-content-center">
          <Col xs={{size: 'auto'}}>
            <SearchBar 
              getBillsFromQuery={this.getBillsFromQuery} 
              getBillsFromBackend={this.getBillsFromBackend}
              onRadioBtnClick={this.onRadioBtnClick} 
              selected={this.state.queryBtn} 
              handleInput={this.handleInput}
              dropdownOpen={this.state.dropdownOpen}
              toggle={this.toggle}
              userState={this.state.userState}
              changeState={this.changeState}
            />
          </Col>
        </Row> <br/>

        {/* MAIN CONTENT */}
        <main>
          <Switch>
            <Route exact path="/" render={(routeProps) => (
              <TrackingContainer {...routeProps} 
                failedLogin={this.state.failedEntry}
                failedRegister={this.state.failedRegister}
                info={this.state.logged} 
                trackedBills={this.state.trackedBills} 
                trackedReps={this.state.trackedReps} 
                untrackBill={this.untrackBill} 
                loginSuccess={this.loginSuccess} 
                handleLogin={this.handleLogin} 
                handleRegister={this.handleRegister} 
                handleChange={this.handleChange}/>)}
            />

            <Route exact path="/tracking" render={(routeProps) => 
              (<TrackingContainer {...routeProps} 
              failedLogin={this.state.failedLogin} 
              failedRegister={this.state.failedRegister}
              info={this.state.logged} 
              trackedBills={this.state.trackedBills} 
              trackedReps={this.state.trackedReps} 
              untrackBill={this.untrackBill} 
              loginSuccess={this.loginSuccess} 
              handleLogin={this.handleLogin} 
              handleRegister={this.handleRegister} 
              handleChange={this.handleChange}/>)}
            />

            <Route exact path="/trending" render={(routeProps) => 
              (<TrendingContainer {...routeProps} 
                untrackBill={this.untrackBill} 
                addBillToTracking={this.addBillToTracking} 
                bills={this.state.bills} 
                updateTrending={this.updateTrending} 
                trackedBills={this.state.trackedBills}
                logged={this.state.logged} />)}
            />

            <Route exact path="/bills" render={(routeProps) => 
              (<BillContainer {...routeProps} 
              untrackBill={this.untrackBill} 
              trackedBills={this.state.trackedBills} 
              bills={this.state.bills} 
              addBillToTracking={this.addBillToTracking}
              logged={this.state.logged}
              />)}
            />

            <Route exact path="/legislators" render={(routeProps) => 
              (<LegislatorContainer {...routeProps} 
              info={this.state.reps} />)}
            />

            {/* <Route exact path="/modal" render={(routeProps) => 
              (<ModalPrompt {...routeProps} 
              />)}
            /> */}

            <Route component={ My404 }/>
          </Switch>
        </main>
        </Container>
      </div>
    );
  }
}

export default App;
