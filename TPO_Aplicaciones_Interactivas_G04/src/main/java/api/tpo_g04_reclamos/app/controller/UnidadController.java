package api.tpo_g04_reclamos.app.controller;

import api.tpo_g04_reclamos.app.controller.dto.UnidadDto;
import api.tpo_g04_reclamos.app.controller.request.UnidadUpdateRequestDto;
import api.tpo_g04_reclamos.app.model.entity.Unidad;
import api.tpo_g04_reclamos.app.service.IUnidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/unidad")
public class UnidadController {
	
	@Autowired
	private IUnidadService unidadService;
	
	@GetMapping("/{unidadId}")
	public ResponseEntity<?> findById(@PathVariable Long unidadId){
		Unidad unidad = unidadService.get(unidadId);
		return ok(new UnidadDto(unidad));
	}

	@DeleteMapping("/{unidadId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Void> delete(@PathVariable("unidadId") Long unidadId) {
		unidadService.deleteById(unidadId);

		return noContent().build();
	}

	@PutMapping("/{unidadId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<UnidadDto> update(@PathVariable("unidadId") Long unidadId, @RequestBody UnidadUpdateRequestDto updateRequest) {
		Unidad updatedUnidad = unidadService.update(unidadId, updateRequest);

		return ok(new UnidadDto(updatedUnidad));
	}
	
}
