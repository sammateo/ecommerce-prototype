import logo from "./logo.svg";
import "./App.css";
import { db } from "./services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

function App() {
	const [products, setProducts] = useState([]);
	const productsCollectionRef = collection(db, "products");
	useEffect(() => {
		// db.collection("products");

		const getProducts = async () => {
			const data = await getDocs(productsCollectionRef);
			console.log(data);
			setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			console.log(data.docs);
		};

		getProducts();
	}, []);
	return (
		<div className="App">
			<div>
				<h1>Product</h1>
				{products.map((product) => (
					<div key={product.id}>
						<p>Name: {product.name}</p>
						<img src="/chicken-nuggets.jpg" alt="" width="100" height="100" />
						<p>Description: {product.description}</p>
						<p>Price: {product.price}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
