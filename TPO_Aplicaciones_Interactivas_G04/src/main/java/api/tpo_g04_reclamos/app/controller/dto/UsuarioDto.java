package api.tpo_g04_reclamos.app.controller.dto;

import api.tpo_g04_reclamos.app.model.enums.TipoUsuario;

import java.util.Date;

public class UsuarioDto {

    private Long id;
    private String nombre;
    private String password;
    private TipoUsuario tipoUsuario;
    private Date fechaCreacion;


    public UsuarioDto() {
        super();
        this.nombre = "";
        this.password = "";
    }

    public UsuarioDto(String nombre, String password, TipoUsuario tipoUsuario) {
        super();
        this.nombre = nombre;
        this.password = password;
        this.tipoUsuario = tipoUsuario;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getPassword() {
        return password;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }
}
