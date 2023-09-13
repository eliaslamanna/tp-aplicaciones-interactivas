package api.tpo_g04_reclamos.app.service;

import api.tpo_g04_reclamos.app.controller.dto.UnidadDto;
import api.tpo_g04_reclamos.app.exception.exceptions.ItemNotFoundException;
import api.tpo_g04_reclamos.app.model.dao.IUnidadDao;
import api.tpo_g04_reclamos.app.model.entity.Unidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UnidadServiceImpl implements IUnidadService {

	@Autowired
	private IUnidadDao unidadDao;
	
	@Override
	public List<Unidad> findAll() {
		return unidadDao.findAll();
	}

	@Override
	public Optional<Unidad> findById(Long id) {
		return unidadDao.findById(id);
	}

	@Override
	public Unidad save(UnidadDto unidadDto) {
		return unidadDao.save(new Unidad(unidadDto.getPiso(), unidadDto.getNumero(), unidadDto.getEdificio(), unidadDto.getEstado()));
	}

	@Override
	public Unidad update(Long id, UnidadDto unidadDto) {
		this.unidadExiste(id);

		Unidad unidadToUpdate = unidadDao.findById(id).get();

		unidadToUpdate.setEdificio(unidadDto.getEdificio());
		unidadToUpdate.setEstado(unidadDto.getEstado());
		unidadToUpdate.setPiso(unidadDto.getPiso());
		unidadToUpdate.setNumero(unidadDto.getNumero());
		return unidadDao.save(unidadToUpdate);

	}

	@Override
	public void deleteById(Long id) {
		this.unidadExiste(id);

		unidadDao.deleteById(id);
	}

	private boolean unidadExiste(Long id) {
		Optional<Unidad> unidad = this.findById(id);

		if(unidad.isEmpty()) {
			throw new ItemNotFoundException("La unidad no existe");
		}

		return true;
	}

}
