

import { Schema } from 'mongoose';

export const JardinsSchema = new Schema({

     nom: { type: String, required: false },
     adresse: { type: String, required: false },
     codePostal: { type: String, required: false },
     ville: { type: String, required: false },
     telephone: { type: String, required: false },
     email: { type: String, required: false },
     siteWeb: { type: String, required: false },
     facebook: { type: String, required: false },
     twitter: { type: String, required: false },
     instagram: { type: String, required: false },
     description: { type: String, required: false },
     latitude: { type: Number, required: false },
     longitude: { type: Number, required: false },
     image: { type: String, required: false },
     horaires: { type: String, required: false },
     tarifs: { type: String, required: false },
     acces: { type: String, required: false },
     parking: { type: String, required: false },
     accesTransport: { type: String, required: false },
     type: { type: String, required: false },
     capacite: { type: Number, required: false },
     public: { type: String, required: false },
     services: { type: String, required: false },
     label: { type: String, required: false },
     note: { type: Number, required: false },
     avis: { type: String, required: false },

     


});
