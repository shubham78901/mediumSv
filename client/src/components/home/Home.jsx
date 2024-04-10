
import Footer from '../footer/Footer.jsx';
import TrendingToday from "../postbody/postbody"
import Navbar from '../navbar/navbar';

const Home = () => {

    return (
        <>
            <Navbar/>
            {/* <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts />
                </Grid>
            </Grid> */}
            <TrendingToday/>
            <Footer/>
        </>
    )
}

export default Home;