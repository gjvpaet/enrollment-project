import axios from 'axios';
import to from 'await-to-js';
import jparam from 'jquery-param';

class HttpService {
    async authenticate(email, password) {
        let url = `${siteUrl}api/users/login`;

        try {
            let result = await axios.post(url, {
                Email: email,
                Password: password
            });

            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async getAllData(entity, query) {
        let url = `${siteUrl}api/${entity}?${query}`;

        try {
            let result = await axios.get(url, {
                headers: { Authorization: localStorage.getItem('token') }
            });
            
            localStorage.setItem('token', result.data.newToken);

            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async getData(entity, queryObj) {
        let url = `${siteUrl}api/${entity}?${jparam(queryObj)}`;

        try {
            let result = await axios.get(url, {
                headers: { Authorization: localStorage.getItem('token') }
            });

            localStorage.setItem('token', result.data.newToken);

            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async insertData(data, entity) {
        let url = `${siteUrl}api/${entity}`;

        try {
            let result = await axios.post(url, data, {
                headers: { Authorization: localStorage.getItem('token') }
            });

            localStorage.setItem('token', result.data.newToken);

            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async updateData(data, id, entity, query) {
        let url = `${siteUrl}api/${entity}/${id}`;

        try {
            let result = await axios.put(url, data, {
                headers: { Authorization: localStorage.getItem('token') }
            });

            localStorage.setItem('token', result.data.newToken);

            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async deleteData(id, entity) {
        let url = `${siteUrl}api/${entity}/${id}`;

        try {
            let result = await axios.delete(url, {
                headers: { Authorization: localStorage.getItem('token') }
            });

            localStorage.setItem('token', result.data.newToken);

            return result.data;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }
}

export default HttpService;
