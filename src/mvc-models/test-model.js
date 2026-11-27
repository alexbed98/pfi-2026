import pool from '#services/db.js';
import { handleDBError } from '#tools';

const TestModel = {

    selectAll: async () => {

        try {

            const query = `SELECT * from item`;

            const rows = await pool.query(query);
            
            return rows;

        } catch(err) {

            handleDBError(err);

        }  
    },

    selectById: async (id) => {
        
        try{
            
            /* 
                
                En JS, si on construit un objet en ne passant que des variables, ça va créer des attributs
                ayant le nom de la variable et la valeur de la variable. C'est simplement un racouci.

                const params = {
                    id : id
                };

                Même chose que

                const params = {
                    id
                };

                On peut même combiner les ajout automatiques et manuels

                const params = {
                id,
                name : "Bob"
            };

            */
            const params = {
                id
            };

            // const [row] = va extraire la première ligne avec les données
            const [row] = await pool.query("SELECT id, name, material, picture, grade, price FROM item WHERE id = :id", params);
            return row; // MariaDB retourne un tableau de résultats

        } catch(err) {

            handleDBError(err);
            
        }  
    },

    insertOne: async (name, material, picture, grade, price) => {

        try {

            const params = {
                name,
                material,
                picture,
                grade,
                price
            };

            const result = await pool.query("insert into item (name, material, picture, grade, price) values (:name, :material, :picture, :grade, :price)", params);
            return Number(result.insertId);        

        } catch(err) {

            handleDBError(err);

        }  

    },

    deleteById: async (id) => {
        
        try{
            
            const params = {
                id
            };

            // const [row] = va extraire la première ligne avec les données
            const result = await pool.query("DELETE FROM item WHERE id = :id", params);
            return result.affectedRows > 0; // MariaDB retourne un tableau de résultats

        } catch(err) {

            handleDBError(err);
            
        }  
    }, 

    updateById: async (id, name, material, picture, grade, price) => {

        try {

            const params = {
                id,
                name,
                material,
                picture,
                grade,
                price                
            };

            const result = await pool.query("update item set name = :name, material = :material, picture = :picture, grade = :grade, price = :price where id = :id", params);
            return result.affectedRows > 0;             

        } catch(err) {

            handleDBError(err);

        }  

    },

    modifyById: async (id, data) => {

        const params = {
            id,
            ...data
        };

        try {

            const fields = Object.entries(data)
            .map(([key]) => `${key} = :${key}`)
            .join(', ');

            const query = "update item set " + fields  + " where id = :id";
            
            const result = await pool.query(query, params);
            return result.affectedRows > 0;        

        } catch(err) {

            handleDBError(err);

        }  

    },

};

export default TestModel;