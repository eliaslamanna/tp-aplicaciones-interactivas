package api.tpo_g04_reclamos.app.service;

import api.tpo_g04_reclamos.app.controller.dto.UnidadDto;
import api.tpo_g04_reclamos.app.controller.request.UnidadUpdateRequestDto;
import api.tpo_g04_reclamos.app.model.entity.Unidad;

import java.util.List;
import java.util.Optional;

public interface IUnidadService {

	List<Unidad> findAll();
	
	Optional<Unidad> findById(Long id);

	Unidad get(Long id);

	List<Unidad> findAllByIds(List<Long> ids);

	Unidad save(UnidadDto unidadDto);

	Unidad update(Long id, UnidadUpdateRequestDto updateRequest);
	
	void deleteById(Long id);
	
}
