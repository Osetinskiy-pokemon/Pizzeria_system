package com.example.pizza.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import javax.persistence.*;

/**
 * Таблица ролей пользователей
 */
@Entity
@Table(name = "roles")
@Setter
@Getter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    private RoleName name;

    public Role() {

    }

    public Role(RoleName name) {
        this.name = name;
    }

}
