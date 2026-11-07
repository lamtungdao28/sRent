package com.srent.media;
import com.srent.common.BaseEntity; import com.srent.room.Room; import jakarta.persistence.*; import lombok.*;
@Entity @Table(name="room_images") @Getter @Setter @NoArgsConstructor
public class RoomImage extends BaseEntity { @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="room_id",nullable=false) private Room room; @Column(name="object_key",nullable=false) private String objectKey; @Column(name="content_type",nullable=false) private String contentType; @Column(name="sort_order",nullable=false) private int sortOrder; }
