package com.hei.api_etudiants;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/etudiants")
public class EtudiantController {

    private final EtudiantRepository etudiantRepository;

    public EtudiantController(EtudiantRepository etudiantRepository) {
        this.etudiantRepository = etudiantRepository;
    }

    @GetMapping
    public List<Etudiant> listerEtudiants() {
        return etudiantRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Etudiant> lireEtudiant(@PathVariable int id) {
        return etudiantRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Etudiant> creerEtudiant(@RequestBody Etudiant nouvelEtudiant) {
        Etudiant etudiantSauvegarde = etudiantRepository.save(nouvelEtudiant);
        return ResponseEntity.status(HttpStatus.CREATED).body(etudiantSauvegarde);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Etudiant> modifierEtudiant(@PathVariable int id, @RequestBody Etudiant etudiantModifie) {
        if (!etudiantRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        etudiantModifie.setId(id);
        Etudiant etudiantMiseAJour = etudiantRepository.save(etudiantModifie);
        return ResponseEntity.ok(etudiantMiseAJour);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Etudiant> modifierPartiellementEtudiant(@PathVariable int id, @RequestBody Etudiant etudiantPartiel) {
        return etudiantRepository.findById(id).map(e -> {
            if (etudiantPartiel.getNom() != null) {
                e.setNom(etudiantPartiel.getNom());
            }
            if (etudiantPartiel.getPrenom() != null) {
                e.setPrenom(etudiantPartiel.getPrenom());
            }
            Etudiant misAJour = etudiantRepository.save(e);
            return ResponseEntity.ok(misAJour);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerEtudiant(@PathVariable int id) {
        if (etudiantRepository.existsById(id)) {
            etudiantRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}