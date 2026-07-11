const Geolocation = () =>{
    const navigate = navigator.geolocation;
    if(!navigate){
        console.log(`Geolocation error`);
        return
    }
    return new Promise((resolve , reject) => {
        navigate.getCurrentPosition(
            async (position) => {
                const crd = position.coords
                resolve({
                    latitude : crd.latitude,
                    longitude : crd.longitude
                });
            },
            (error) => {
                reject(error.message);
            }
        )
    })
}

export default Geolocation;