package com.srent.chat;
import com.srent.common.BaseEntity; import com.srent.user.User; import jakarta.persistence.*; import lombok.*;
@Entity @Table(name="messages") @Getter @Setter @NoArgsConstructor
public class Message extends BaseEntity { @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="conversation_id",nullable=false) private Conversation conversation; @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="sender_id",nullable=false) private User sender; @Column(nullable=false) private String content; @Column(nullable=false) private boolean masked; }
