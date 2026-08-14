import { Etudiant } from '../models/Etudiant.js';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'rose',
    host: 'localhost',
    database: 'db_etudiants',
    password: 'jtmmaman',
    port: 5432,
});

export class EtudiantRepository {
    async findAll(): Promise<Etudiant[]> {
        const result = await pool.query('SELECT * FROM etudiants');
        return result.rows;
    }

    async findById(id: number): Promise<Etudiant | undefined> {
        const result = await pool.query('SELECT * FROM etudiants WHERE id = $1', [id]);
        return result.rows[0];
    }

    async save(etudiant: Etudiant): Promise<Etudiant> {
        const result = await pool.query(
            'INSERT INTO etudiants (nom, prenom, email) VALUES ($1, $2, $3) RETURNING *',
            [etudiant.nom, etudiant.prenom, etudiant.email]
        );
        return result.rows[0];
    }

    async update(id: number, updatedData: Partial<Etudiant>): Promise<Etudiant | undefined> {
        const current = await this.findById(id);
        if (!current) return undefined;

        const nom = updatedData.nom ?? current.nom;
        const prenom = updatedData.prenom ?? current.prenom;
        const email = updatedData.email ?? current.email;

        const result = await pool.query(
            'UPDATE etudiants SET nom = $1, prenom = $2, email = $3 WHERE id = $4 RETURNING *',
            [nom, prenom, email, id]
        );
        return result.rows[0];
    }

    async delete(id: number): Promise<boolean> {
        const result = await pool.query('DELETE FROM etudiants WHERE id = $1', [id]);
        return (result.rowCount ?? 0) > 0;
    }
}