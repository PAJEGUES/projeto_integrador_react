import "./search"
import Search from "./search";

export default function Maps(){
    return(
        <div>    
            <Search/>
            <div class="map-responsive"><iframe src="https://www.google.com/maps/embed?q=Rua+Episcopal+numero+338+São+Carlos,+SP" width="100%" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
        </div>
    );
}