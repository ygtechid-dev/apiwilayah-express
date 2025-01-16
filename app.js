// Import express dan supabase client
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { log } = require('console');

// Membuat instance Express
const app = express();
const port = 3000;

// Inisialisasi Supabase Client
const supabaseUrl = 'https://brxdwiefnwipsbgkfybi.supabase.co'; // Ganti dengan URL Supabase Anda
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyeGR3aWVmbndpcHNiZ2tmeWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzMDY4NTEsImV4cCI6MjA1MTg4Mjg1MX0.Xwo_eR1USjBVVRMgiCxGvBL7vgGszuuy_Y94zatSY8U'; // Ganti dengan API Key Supabase Anda
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware untuk parsing JSON body
app.use(express.json());

// Endpoint untuk mengambil data dari Supabase
app.get('/dataProvinsi', async (req, res) => {
  try {
    // Query data dari tabel 'users' misalnya
    const { data, error } = await supabase
      .from('info_province')  // Ganti dengan nama tabel Anda
      .select('name, id'); // Pilih semua kolom

    if (error) {
      throw error;
    }

    console.log('dataa', data);
    
    // Kirimkan data ke client
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


app.post('/filterKabKot', async (req, res) => {
    try {
        const { province_id } = req.body; // Ambil province_id dari body request
      // Query data dari tabel 'users' misalnya
      const { data, error } = await supabase
        .from('info_kabupatenkota')  // Ganti dengan nama tabel Anda
        .select('name, id'); // Pilih semua kolom
  
      if (error) {
        throw error;
      }

      
      const filterdatas = data.filter((e) => e.id.toString().startsWith(province_id));
  
      console.log('dataPROVINC', filterdatas);
      
      // Kirimkan data ke client
      res.json(filterdatas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });



  app.post('/filterKecamatan', async (req, res) => {
    try {
      const { kabkot_id } = req.body; // Ambil kabkot_id dari body request
  
      // Query data dengan filter `ilike` langsung di Supabase
      const { data, error } = await supabase
        .from('info_kecamatan')  // Ganti dengan nama tabel Anda
        .select('name, id')      // Pilih kolom yang relevan
        .ilike('id', `${kabkot_id.trim()}%`); // Filter berdasarkan id yang diawali dengan kabkot_id
  
      if (error) {
        throw error;
      }
  
      // Kirimkan hasil data ke klien
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  

  app.post('/filterKelurahan', async (req, res) => {
    try {
      const { kecamatan_id } = req.body; // Ambil kabkot_id dari body request
  
      // Query data dengan filter `ilike` langsung di Supabase
      const { data, error } = await supabase
        .from('info_kelurahan')  // Ganti dengan nama tabel Anda
        .select('name, id')      // Pilih kolom yang relevan
        .ilike('id', `${kecamatan_id.trim()}%`); // Filter berdasarkan id yang diawali dengan kabkot_id
  
      if (error) {
        throw error;
      }
  
      // Kirimkan hasil data ke klien
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  
  
// Endpoint untuk menambahkan data ke Supabase
app.post('/add', async (req, res) => {
  const { name, email } = req.body;

  try {
    const { data, error } = await supabase
      .from('users')  // Ganti dengan nama tabel Anda
      .insert([
        { name, email },
      ]);

    if (error) {
      throw error;
    }

    res.status(201).json({ message: 'Data added successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
