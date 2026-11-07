package com.srent.chat;
import com.srent.common.BaseEntity; import com.srent.room.Room; import com.srent.user.User; import jakarta.persistence.*; import lombok.*; import java.time.Instant;
@Entity @Table(name="conversations") @Getter @Setter @NoArgsConstructor
public class Conversation extends BaseEntity { @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="room_id",nullable=false) private Room room; @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="student_id",nullable=false) private User student; @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="landlord_id",nullable=false) private User landlord; @Column(name="student_last_read_at") private Instant studentLastReadAt; @Column(name="landlord_last_read_at") private Instant landlordLastReadAt; }
