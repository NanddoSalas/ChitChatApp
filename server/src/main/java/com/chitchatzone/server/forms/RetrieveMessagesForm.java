package com.chitchatzone.server.forms;

import io.micrometer.common.lang.Nullable;
import lombok.Data;

@Data
public class RetrieveMessagesForm {

    @Nullable
    private int cursor;

}
