package api.tpo_g04_reclamos.app.controller;

import api.tpo_g04_reclamos.app.controller.dto.ReclamoDto;
import api.tpo_g04_reclamos.app.controller.dto.ReclamoSearchDto;
import api.tpo_g04_reclamos.app.controller.request.ReclamoRequestDto;
import api.tpo_g04_reclamos.app.exception.exceptions.ItemNotFoundException;
import api.tpo_g04_reclamos.app.model.entity.Edificio;
import api.tpo_g04_reclamos.app.model.entity.Reclamo;
import api.tpo_g04_reclamos.app.service.IEdificioService;
import api.tpo_g04_reclamos.app.service.IReclamoService;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/reclamos")
public class ReclamoController {

    @Autowired
    private IReclamoService reclamoService;

	@GetMapping
	public ResponseEntity<List<ReclamoDto>> findAll(@RequestParam(value = "edificioId", required = false) String edificioId) {
		if(Strings.isNotBlank(edificioId)) {
			return new ResponseEntity<>(ReclamoDto.fromList(reclamoService.findAllByEdificioId(Long.valueOf(edificioId))), OK);
		}

		return new ResponseEntity<>(ReclamoDto.fromList(reclamoService.findAll()), OK);
	}

	@GetMapping("/search")
	public ResponseEntity<List<ReclamoDto>> findAllByEstado(@RequestBody ReclamoSearchDto reclamoSearchDto){
		return new ResponseEntity<>(ReclamoDto.fromList(reclamoService.findByEstado(reclamoSearchDto.getEstado())), OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ReclamoDto> findById(@PathVariable Long id){
		Reclamo reclamo = reclamoService.findById(id).orElseThrow(() -> new ItemNotFoundException("El reclamo no existe"));

		return new ResponseEntity<>(new ReclamoDto(reclamo), OK);
	}
	
	@PostMapping
	public ResponseEntity<ReclamoDto> createReclamo(@RequestBody ReclamoRequestDto reclamo) {
		Reclamo reclamoCreado = reclamoService.save(reclamo);
		return new ResponseEntity<>(new ReclamoDto(reclamoCreado), CREATED);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ReclamoDto> updateReclamo(@PathVariable Long id, @RequestBody ReclamoRequestDto reclamo) {
		Reclamo reclamoActualizado = reclamoService.update(id, reclamo);
		return new ResponseEntity<>(new ReclamoDto(reclamoActualizado), OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteReclamo(@PathVariable Long id){
		reclamoService.deleteById(id);

		return new ResponseEntity<>(String.format("deleted reclamo %s", id), OK);
	}
}
