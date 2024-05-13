
import Cloudy from "../assets/Cloudy.mp4"

//  function Today({weatherData, Today, City}){
//     return(
//         <div className="today">
//         {weatherData ? (
//           <>
//             <h2>{Today}'s Weather</h2>
//             <p>{city}</p>    
//            <p>Temperature: {weatherData.main.temp}°C</p>
//            <p>{weatherData.weather[0].description}</p>
//            {/* Conditionally renders image based on weather condition */}
//              {weatherData.weather[0].main === 'Clear' ? (
//               <img src="" alt="Clear Sky" />
//             ) : weatherData.weather[0].main === 'Rain' ? (
//               <img src="" alt="Rainy" />
//             ) : (
//               <img src="default-image.jpg" alt="Default" />
//              )}
//          </>
//         ) : (
//           <p>No weather data available</p>
//          )}
//      </div>
//     );
//  }
//  export default Today

// function Today(){
//     return (
//         <div className="card-container lg:w-1/2 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col lg:flex-row justify-between leading-normal">
//             <div className="weatherImg lg:w-1/2">
//              <video src={Cloudy} className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" autoPlay muted loop/>
//             </div>
            
//             <div className="secondColumn lg:w-1/2 lg:pr-4"> 
//                 <h2 className="h2Card text-gray-900 font-bold text-xl mb-2">Today's Weather</h2>
//                 <p>Berlin</p>
//                 <p>Temperature: 20°C</p>
//                 <p>Clear Sky</p>
//             </div>
            
//       </div>
//     )
// }
// export default Today

function Today({weatherData, Today, City}){
    
  
    return (
      <div className="card-container lg:w-1/2 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col lg:flex-row justify-between leading-normal">
        <div className="weatherImg lg:w-1/2">
          {weatherCondition === 'Clear' ? (
            <video src={SunnyVideo} className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" autoPlay muted loop />
          ) : weatherCondition === 'Cloudy' ? (
            <video src={CloudyVideo} className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" autoPlay muted loop />
          ) : weatherCondition === 'Snowy' ? (
            <video src={SnowyVideo} className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" autoPlay muted loop />
          ) : weatherCondition === 'Rainy' ? (
            <video src={RainyVideo} className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" autoPlay muted loop />
          ) : null}
        </div>
  
        <div className="secondColumn lg:w-1/2 lg:pr-4">
          <h2 className="h2Card text-gray-900 font-bold text-xl mb-2">Today's Weather</h2>
          <p>{City}</p>
          <p> {temperature}°C</p>
          <p>{description}</p>
        </div>
      </div>
    );
  }
  
  export default Today;