import { EtudiantRepository } from '../repositories/EtudiantRepository.js';
import { Etudiant } from '../models/Etudiant.js';

export class EtudiantService {
    private repository = new EtudiantRepository();

    async listerTous(): Promise<Etudiant[]> {
        return await this.repository.findAll();
    }

    async trouverParId(id: number): Promise<Etudiant | undefined> {
        return await this.repository.findById(id);
    }

    async creer(etudiant: Etudiant): Promise<Etudiant> {
        return await this.repository.save(etudiant);
    }

    async modifier(id: number, etudiant: Partial<Etudiant>): Promise<Etudiant | undefined> {
        return await this.repository.update(id, etudiant);
    }

    async supprimer(id: number): Promise<boolean> {
        return await this.repository.delete(id);
    }
}