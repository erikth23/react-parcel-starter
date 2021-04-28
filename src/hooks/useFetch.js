import {csv} from "d3-fetch";
import {useState, useEffect} from "react";

const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const fetchUrl = () => {
		csv(url).then(res => {
			setData(res);
			setLoading(false);
		});
	}
	useEffect(() => {
		fetchUrl();
	}, []);
	return [data, loading];
};
export {
	useFetch
};
